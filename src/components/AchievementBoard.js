import React from "react";

// 这里接收父组件 (App.js) 传过来的数据
export default function AchievementBoard({
  ACHIEVEMENTS,
  unlockedIds,
  rarityConfig,
  t,
}) {
  return (
    <div className="space-y-4">
      {ACHIEVEMENTS.map((ach) => {
        const isUnlocked = unlockedIds.includes(ach.id);
        const rConf = rarityConfig[ach.rarity];
        const AchIcon = ach.icon;

        return (
          <div
            key={ach.id}
            className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 ${
              isUnlocked
                ? rConf.color + " dark:bg-slate-800 dark:border-slate-600"
                : "bg-slate-50 border-slate-100 opacity-50 dark:bg-slate-800/50 dark:border-slate-700"
            }`}
          >
            {/* 左侧图标 */}
            <div
              className={`p-3 rounded-full flex-shrink-0 ${
                isUnlocked
                  ? "bg-white/60 shadow-sm"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <AchIcon className="w-6 h-6" />
            </div>

            {/* 右侧文字区 */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-lg !text-slate-800 dark:!text-slate-100">
                  {t(`achievementsList.${ach.id}.title`)}
                </h3>
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded-md ${
                    isUnlocked
                      ? "bg-white/60"
                      : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                  }`}
                >
                  {t(`achievementsList.${ach.id}.badge`)}
                </span>
              </div>
              <p className="text-xs opacity-80 text-slate-600 dark:text-slate-300">
                {t(`achievementsList.${ach.id}.desc`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
