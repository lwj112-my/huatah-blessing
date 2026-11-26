import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

/**
 * 移动端优先容器：
 * - 手机端（< 480px）：全屏沉浸显示
 * - 电脑端（>= 480px）：居中模拟 410px 手机竖屏画框，适合浏览与录屏分享
 */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-[100dvh] w-full sm:desktop-backdrop sm:flex sm:items-center sm:justify-center sm:py-5 sm:px-4">
      <div
        className="
          relative w-full min-h-[100dvh]
          sm:min-h-[780px] sm:max-h-[860px] sm:w-[410px]
          sm:rounded-[34px] sm:border-[6px] sm:border-[#3A2618]
          sm:shadow-[0_24px_60px_rgba(58,38,24,0.28)]
          xuan-paper-bg overflow-x-hidden overflow-y-auto
          flex flex-col
        "
      >
        {/* 桌面端手机听筒装饰 */}
        <div className="hidden sm:flex justify-center pt-2 pb-0.5 pointer-events-none">
          <div className="w-16 h-1.5 rounded-full bg-[#3A2618]/20" />
        </div>

        {children}
      </div>
    </div>
  );
}
