import React from "react";
import BallMix from "./components/home/BallMix";
import Link from "next/link";
import { ROUTES } from "./constants/routes";
import Button from "./components/common/Button";
import DeviceActionText from "./components/home/DeviceActionText";

export default function Home() {
  return (
    <section>
      <div className="mt-20">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl lg:mt-32 lg:text-6xl">
          클로버픽 AI가 <br className="md:hidden" />
          선택한 번호, <br /> 최고의 행운을 <br className="md:hidden" />
          당신에게!
        </h2>

        <div className="mt-16 flex w-full flex-col items-center gap-5 md:flex-row md:justify-center">
          <div className="w-full max-w-sm md:w-auto">
            <Link href={ROUTES.LOTTO_645}>
              <Button className="w-full">로또 6/45 번호 추첨하기</Button>
            </Link>
          </div>
          <div className="w-full max-w-sm md:w-auto">
            <Link href={ROUTES.LOTTO_645}>
              <Button className="w-full">연금복권 720+ 번호 추첨하기</Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mt-2 h-56 w-full max-w-screen-sm md:h-72">
            <BallMix />

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform md:bottom-10">
              <DeviceActionText />
            </div>
          </div>
        </div>
      </div>

      <div>test@@@@@@@@@@</div>
    </section>
  );
}
