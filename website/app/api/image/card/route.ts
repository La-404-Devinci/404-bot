import { db } from "@/database/db";
import { user } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const users = await db
    .select({ image: user.image })
    .from(user)
    .where(eq(user.id, id ?? ""))
    .limit(1);

  if (users.length === 0 || !users[0].image) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userImage = users[0].image;
  const image = await fetch(userImage);
  const imageBuffer = await image.arrayBuffer();

  const baseImage = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/models/card.png`
  );
  const baseImageBuffer = await baseImage.arrayBuffer();

  //! NOTES
  //! The card texture is 512x512
  //! But each face is 256x390
  //! The front face is on the left
  //! The back face is on the right

  // Generate a 512*512 white image with a circle on the center
  const generatedImage = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      {
        input: await sharp(baseImageBuffer).toBuffer(),
        top: 0,
        left: 0,
      },
      {
        input: await sharp(imageBuffer)
          .resize(128)
          .composite([
            {
              input: Buffer.from(`<svg><circle cx="64" cy="64" r="64"/></svg>`),
              blend: "dest-in",
            },
          ])
          .toBuffer(),
        top: 64,
        left: 64,
      },
    ])
    .png()
    .toBuffer();

  const flippedImage = await sharp(generatedImage).flip().toBuffer();

  const response = new NextResponse(flippedImage);
  response.headers.set("Content-Type", "image/png");
  return response;
};
