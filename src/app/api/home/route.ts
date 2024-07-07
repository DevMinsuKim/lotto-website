import prisma from "@/libs/prisma";
import { convertToKoreaTime } from "@/utils/convertToKoreaTime";
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lottoCreateCount = await prisma.created_lotto.count();

    const lottoWinningCount = await prisma.winning_lotto.count();

    const pensionCreateCount = await prisma.created_pension.count();

    const pensionWinningCount = await prisma.winning_pension.count();

    const lottoCreateListData = await prisma.created_lotto.findMany({
      orderBy: { id: "desc" },
      take: 5,
      select: {
        draw_number: true,
        number1: true,
        number2: true,
        number3: true,
        number4: true,
        number5: true,
        number6: true,
        created: true,
      },
    });

    const pensionCreateListData = await prisma.created_pension.findMany({
      orderBy: { id: "desc" },
      take: 5,
      select: {
        draw_number: true,
        number: true,
        created: true,
      },
    });

    const lottoCreateList = lottoCreateListData.map((item) => ({
      ...item,
      created: convertToKoreaTime(new Date(item.created)),
    }));

    if (
      lottoCreateCount == null ||
      lottoCreateList == null ||
      pensionCreateCount == null ||
      pensionWinningCount == null ||
      lottoWinningCount == null ||
      pensionCreateListData == null
    ) {
      Sentry.captureMessage("데이터 생성 중 오류가 발생했습니다.", "error");
      return NextResponse.json({ error: { code: "1000" } }, { status: 404 });
    }

    const responseData = {
      lottoCreateCount,
      lottoWinningCount,
      pensionCreateCount,
      pensionWinningCount,
      lottoCreateList,
      pensionCreateListData,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return Response.json({ error: { code: "2000" } }, { status: 500 });
  }
}