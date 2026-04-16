import React from "react";
// 注意：如果在历史记录里还用到了其他图标(比如 Trash2, Edit 等)，请在这里一并加上
import { Smile, Frown, Lightbulb, AlignLeft, Save } from "lucide-react";

export default function DiarySection({
  diaryMode,
  currentDiary,
  handleDiaryChange,
  saveDiary,
  sortedDiaryKeys,
  diaryHistory,
  t,
}) {
  return (
    <div className="p-4 md:p-8 max-h-[70vh] overflow-y-auto hide-scrollbar bg-slate-50 dark:bg-slate-900">
      {diaryMode === "write" ? (
        <div className="space-y-6">
          {/* 1. 开心 */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm focus-within:ring-2 ring-green-100 transition">
            <h3 className="text-green-600 font-bold flex items-center gap-2 mb-3">
              <Smile className="w-5 h-5" />
              {t("journal.q1Title")}
            </h3>
            <textarea
              value={currentDiary.happy}
              onChange={(e) => handleDiaryChange("happy", e.target.value)}
              placeholder={t("journal.q1Placeholder")}
              className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500"
            />
          </div>
          {/* 2. 不开心 */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm focus-within:ring-2 ring-slate-200 transition">
            <h3 className="text-slate-500 font-bold flex items-center gap-2 mb-3">
              <Frown className="w-5 h-5" /> {t("journal.q2Title")}
            </h3>
            <textarea
              value={currentDiary.unhappy}
              onChange={(e) => handleDiaryChange("unhappy", e.target.value)}
              placeholder={t("journal.q2Placeholder")}
              className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500"
            />
          </div>

          {/* 3. 感悟 */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm focus-within:ring-2 ring-yellow-100 transition">
            <h3 className="text-yellow-600 font-bold flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5" /> {t("journal.q3Title")}
            </h3>
            <textarea
              value={currentDiary.reflection}
              onChange={(e) => handleDiaryChange("reflection", e.target.value)}
              placeholder={t("journal.q3Placeholder")}
              className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500"
            />
          </div>
          {/* 4. 其他 */}
          {/* 4. 其他 */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm focus-within:ring-2 ring-indigo-100 transition">
            <h3 className="text-indigo-500 font-bold flex items-center gap-2 mb-3">
              <AlignLeft className="w-5 h-5" /> {t("journal.q4Title")}
            </h3>
            <textarea
              value={currentDiary.other}
              onChange={(e) => handleDiaryChange("other", e.target.value)}
              placeholder={t("journal.emptyHistory")}
              className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500"
            />
          </div>

          <button
            onClick={saveDiary}
            className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-600 transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> {t("journal.saveBtn")}
          </button>
        </div>
      ) : (
        /* 历史记录列表 */
        <div className="space-y-6">
          {sortedDiaryKeys.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              {t("journal.emptyHistory")}
            </div>
          ) : (
            sortedDiaryKeys.map((dateStr) => {
              const entry = diaryEntries[dateStr];
              const isEmpty =
                !entry.happy &&
                !entry.unhappy &&
                !entry.reflection &&
                !entry.other;
              if (isEmpty) return null;

              return (
                <div
                  key={dateStr}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <h2 className="font-black text-xl text-slate-800 mb-4 border-b border-slate-100 pb-2">
                    {dateStr}
                  </h2>
                  <div className="space-y-4">
                    {entry.happy && (
                      <div>
                        <p className="text-xs font-bold text-green-600 mb-1 flex items-center gap-1">
                          <Smile className="w-3 h-3" /> 开心
                        </p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {entry.happy}
                        </p>
                      </div>
                    )}
                    {entry.unhappy && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <Frown className="w-3 h-3" /> 烦恼
                        </p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {entry.unhappy}
                        </p>
                      </div>
                    )}
                    {entry.reflection && (
                      <div>
                        <p className="text-xs font-bold text-yellow-600 mb-1 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" /> 感悟
                        </p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {entry.reflection}
                        </p>
                      </div>
                    )}
                    {entry.other && (
                      <div>
                        <p className="text-xs font-bold text-indigo-500 mb-1 flex items-center gap-1">
                          <AlignLeft className="w-3 h-3" /> 其他
                        </p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {entry.other}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
