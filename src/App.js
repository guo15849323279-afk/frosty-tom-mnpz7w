import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  Circle,
  Clock,
  Coffee,
  Dumbbell,
  BookOpen,
  Camera,
  Video,
  MonitorPlay,
  Music,
  BrainCircuit,
  BarChart2,
  Settings,
  Plus,
  Trash2,
  X,
  Save,
  Trophy,
  Flame,
  BellRing,
  Award,
  Star,
  Medal,
  Crown,
  Zap,
  Target,
  Sparkles,
  Gem,
  Cpu,
  Code,
  Lightbulb,
  BatteryCharging,
  Rocket,
  PenTool,
  Smile,
  Frown,
  AlignLeft,
  History,
  BookHeart,
  Heart,
  Download,
  Bell,
  Mail,
} from "lucide-react";

// --- 默认课表数据 ---
const defaultSchedule = {
  0: [], // 周日
  1: [], // 周一
  2: [], // 周二
  3: [], // 周三
  4: [], // 周四
  5: [], // 周五
  6: [], // 周六
};

// --- 类型与图标映射 ---
const typeConfig = {
  class: {
    label: "tasks.type_course",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: BookOpen,
  },
  self: {
    label: "tasks.type_self",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: BookOpen,
  },
  rest: {
    label: "tasks.type_rest",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: Coffee,
  },
  focus: {
    label: "tasks.type_focus",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: Music,
  },
  workout: {
    label: "tasks.type_sport",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: Dumbbell,
  },
  tech: {
    label: "tasks.type_tech",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: BrainCircuit,
  },
  creative: {
    label: "tasks.type_create",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Video,
  },
  default: {
    label: "tasks.type_general",
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: CheckCircle2,
  },
};

// --- 奖励层级设定 ---
const getLevelInfo = (xp) => {
  if (xp < 50) return { level: 1, title: "初学学徒", min: 0, max: 50 };
  if (xp < 150) return { level: 2, title: "进阶行者", min: 50, max: 150 };
  if (xp < 300) return { level: 3, title: "自律达人", min: 150, max: 300 };
  if (xp < 600) return { level: 4, title: "心流大师", min: 300, max: 600 };
  if (xp < 1200) return { level: 5, title: "时间领主", min: 600, max: 1200 };
  if (xp < 2500)
    return { level: 10, title: "维度掌控者", min: 1200, max: 2500 };
  return { level: 99, title: "极简神明", min: 2500, max: xp + 1000 };
};

// --- 成就系统配置 ---
const rarityConfig = {
  common: {
    label: "普通",
    color: "bg-slate-100 text-slate-600 border-slate-300",
  },
  rare: {
    label: "稀有",
    color: "bg-blue-50 text-blue-700 border-blue-300 shadow-sm shadow-blue-200",
  },
  epic: {
    label: "史诗",
    color:
      "bg-purple-50 text-purple-700 border-purple-300 shadow-md shadow-purple-200",
  },
  legendary: {
    label: "传说",
    color:
      "bg-gradient-to-r from-amber-100 to-yellow-200 text-amber-800 border-yellow-400 shadow-lg shadow-yellow-300",
  },
};

const ACHIEVEMENTS = [
  // 总任务量 (6)
  {
    id: "task_1",
    rarity: "common",
    condition: (s) => s.total >= 1,
    icon: Star,
  },
  {
    id: "task_10",
    rarity: "common",
    condition: (s) => s.total >= 10,
    icon: Star,
  },
  {
    id: "task_50",
    rarity: "rare",
    condition: (s) => s.total >= 50,
    icon: Target,
  },
  {
    id: "task_200",
    rarity: "epic",
    condition: (s) => s.total >= 200,
    icon: Sparkles,
  },
  {
    id: "task_500",
    rarity: "legendary",
    condition: (s) => s.total >= 500,
    icon: Crown,
  },
  {
    id: "task_1000",
    rarity: "legendary",
    condition: (s) => s.total >= 1000,
    icon: Gem,
  },
  // 连胜 (8)
  {
    id: "streak_3",
    rarity: "common",
    condition: (s) => s.streak >= 3,
    icon: Flame,
  },
  {
    id: "streak_7",
    rarity: "rare",
    condition: (s) => s.streak >= 7,
    icon: Flame,
  },
  {
    id: "streak_14",
    rarity: "rare",
    condition: (s) => s.streak >= 14,
    icon: Flame,
  },
  {
    id: "streak_21",
    rarity: "epic",
    condition: (s) => s.streak >= 21,
    icon: Flame,
  },
  {
    id: "streak_30",
    rarity: "epic",
    condition: (s) => s.streak >= 30,
    icon: Flame,
  },
  {
    id: "streak_50",
    rarity: "legendary",
    condition: (s) => s.streak >= 50,
    icon: Flame,
  },
  {
    id: "streak_100",
    rarity: "legendary",
    condition: (s) => s.streak >= 100,
    icon: Trophy,
  },
  {
    id: "streak_365",
    rarity: "legendary",
    condition: (s) => s.streak >= 365,
    icon: Crown,
  },
  // 等级 (5)
  {
    id: "level_2",
    rarity: "common",
    condition: (s) => s.level >= 2,
    icon: Zap,
  },
  { id: "level_3", rarity: "rare", condition: (s) => s.level >= 3, icon: Zap },
  { id: "level_4", rarity: "epic", condition: (s) => s.level >= 4, icon: Zap },
  {
    id: "level_5",
    rarity: "legendary",
    condition: (s) => s.level >= 5,
    icon: Zap,
  },
  {
    id: "level_10",
    rarity: "legendary",
    condition: (s) => s.level >= 10,
    icon: Crown,
  },
  // 健身运动 (5)
  {
    id: "work_1",
    rarity: "common",
    condition: (s) => s.workout >= 1,
    icon: Dumbbell,
  },
  {
    id: "work_10",
    rarity: "rare",
    condition: (s) => s.workout >= 10,
    icon: Dumbbell,
  },
  {
    id: "work_50",
    rarity: "epic",
    condition: (s) => s.workout >= 50,
    icon: Dumbbell,
  },
  {
    id: "work_100",
    rarity: "epic",
    condition: (s) => s.workout >= 100,
    icon: Dumbbell,
  },
  {
    id: "work_300",
    rarity: "legendary",
    condition: (s) => s.workout >= 300,
    icon: Dumbbell,
  },
  // 深度学习/学业 (5)
  {
    id: "stu_1",
    rarity: "common",
    condition: (s) => s.self + s.class >= 1,
    icon: BookOpen,
  },
  {
    id: "stu_10",
    rarity: "rare",
    condition: (s) => s.self + s.class >= 10,
    icon: BookOpen,
  },
  {
    id: "stu_50",
    rarity: "epic",
    condition: (s) => s.self + s.class >= 50,
    icon: BookOpen,
  },
  {
    id: "stu_100",
    rarity: "epic",
    condition: (s) => s.self + s.class >= 100,
    icon: BookOpen,
  },
  {
    id: "stu_300",
    rarity: "legendary",
    condition: (s) => s.self + s.class >= 300,
    icon: BookOpen,
  },
  // 技能/专注 (雅思/吉他等) (5)
  {
    id: "foc_1",
    rarity: "common",
    condition: (s) => s.focus >= 1,
    icon: Target,
  },
  {
    id: "foc_10",
    rarity: "rare",
    condition: (s) => s.focus >= 10,
    icon: Target,
  },
  {
    id: "foc_50",
    rarity: "epic",
    condition: (s) => s.focus >= 50,
    icon: Target,
  },
  {
    id: "foc_100",
    rarity: "epic",
    condition: (s) => s.focus >= 100,
    icon: Target,
  },
  {
    id: "foc_300",
    rarity: "legendary",
    condition: (s) => s.focus >= 300,
    icon: Target,
  },
  // 科技/AI (4)
  {
    id: "tech_1",
    rarity: "common",
    condition: (s) => s.tech >= 1,
    icon: BrainCircuit,
  },
  { id: "tech_10", rarity: "rare", condition: (s) => s.tech >= 10, icon: Cpu },
  { id: "tech_50", rarity: "epic", condition: (s) => s.tech >= 50, icon: Code },
  {
    id: "tech_100",
    rarity: "legendary",
    condition: (s) => s.tech >= 100,
    icon: Rocket,
  },
  // 创作/视觉 (摄影/剪辑) (4)
  {
    id: "cre_1",
    rarity: "common",
    condition: (s) => s.creative >= 1,
    icon: Camera,
  },
  {
    id: "cre_10",
    rarity: "rare",
    condition: (s) => s.creative >= 10,
    icon: Lightbulb,
  },
  {
    id: "cre_50",
    rarity: "epic",
    condition: (s) => s.creative >= 50,
    icon: Video,
  },
  {
    id: "cre_100",
    rarity: "legendary",
    condition: (s) => s.creative >= 100,
    icon: Gem,
  },
  // 休息与恢复 (4)
  {
    id: "rest_1",
    rarity: "common",
    condition: (s) => s.rest >= 1,
    icon: Coffee,
  },
  {
    id: "rest_10",
    rarity: "rare",
    condition: (s) => s.rest >= 10,
    icon: BatteryCharging,
  },
  {
    id: "rest_50",
    rarity: "epic",
    condition: (s) => s.rest >= 50,
    icon: Coffee,
  },
  {
    id: "rest_100",
    rarity: "legendary",
    condition: (s) => s.rest >= 100,
    icon: BatteryCharging,
  },
  // 日记系统专属成就 (2)
  {
    id: "diary_1",
    rarity: "common",
    condition: (s) => s.diary >= 1,
    icon: PenTool,
  },
  {
    id: "diary_10",
    rarity: "epic",
    condition: (s) => s.diary >= 10,
    icon: BookHeart,
  },
  // 特殊组合成就 (3)
  {
    id: "combo_1",
    rarity: "epic",
    condition: (s) => s.workout >= 10 && s.self + s.class >= 10,
    icon: Medal,
  },
  {
    id: "combo_2",
    rarity: "epic",
    condition: (s) => s.tech >= 10 && s.creative >= 10,
    icon: Sparkles,
  },
  {
    id: "combo_3",
    rarity: "legendary",
    condition: (s) =>
      s.workout >= 10 &&
      s.self + s.class >= 10 &&
      s.tech >= 10 &&
      s.creative >= 10 &&
      s.focus >= 10,
    icon: Crown,
  },
];
export default function App() {
  // 1. 召唤翻译引擎（必须放在最前面！）
  const { t, i18n } = useTranslation();

  // 2. 配置双语星期数组
  const weekDaysZh = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const weekDaysEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDays = i18n.language === "en" ? weekDaysEn : weekDaysZh;
  const dayOfWeek = new Date().getDay();
  const [showAbout, setShowAbout] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [checkedTasks, setCheckedTasks] = useState([]);
  const [historyData, setHistoryData] = useState({});
  const [toastMsg, setToastMsg] = useState(null);

  // 成就与定制状态
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [scheduleData, setScheduleData] = useState(defaultSchedule);
  const todayTasks = scheduleData[dayOfWeek] || [];
  const [isEditing, setIsEditing] = useState(false);
  const [editingDay, setEditingDay] = useState(new Date().getDay());

  // 日记系统状态
  const [showDiary, setShowDiary] = useState(false);
  const [diaryMode, setDiaryMode] = useState("write"); // 'write' 或 'history'
  const [diaryEntries, setDiaryEntries] = useState({});
  const [currentDiary, setCurrentDiary] = useState({
    happy: "",
    unhappy: "",
    reflection: "",
    other: "",
  });

  // 1. 深色模式状态 (默认读取本地存储)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 3. 监听深色模式变化并存入缓存
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // 👇👇👇 刚刚粘贴的导出功能在这里 👇👇👇
  // 💾 数据导出功能
  const handleExportData = () => {
    try {
      // 1. 获取本地存储的所有数据
      const allData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
      }

      // 2. 检查是否有数据
      if (Object.keys(allData).length === 0) {
        alert("目前还没有存储任何数据。");
        return;
      }

      // 3. 转化为 JSON 字符串并创建下载
      const dataStr = JSON.stringify(allData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `极简心流备份_${new Date().toLocaleDateString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert("导出成功！数据已妥善备份。");
    } catch (error) {
      console.error("导出失败:", error);
      alert("导出失败，请在电脑浏览器尝试。");
    }
  };
  // 👆👆👆 导出功能到这里结束 👆👆👆

  // 初始化读取本地数据
  useEffect(() => {
    const savedLogs = localStorage.getItem("flow_state_logs");
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setHistoryData(logs);
      const todayStr = new Date().toLocaleDateString("en-CA");
      if (logs[todayStr]) setCheckedTasks(logs[todayStr]);
    }

    const savedSchedule = localStorage.getItem("flow_state_schedule");
    if (savedSchedule) setScheduleData(JSON.parse(savedSchedule));

    const savedAch = localStorage.getItem("flow_state_achievements");
    if (savedAch) setUnlockedIds(JSON.parse(savedAch));

    // 读取日记
    const savedDiary = localStorage.getItem("flow_state_diary");
    if (savedDiary) {
      const parsedDiary = JSON.parse(savedDiary);
      setDiaryEntries(parsedDiary);
      const todayStr = new Date().toLocaleDateString("en-CA");
      if (parsedDiary[todayStr]) {
        setCurrentDiary(parsedDiary[todayStr]);
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentDate.getHours();
  const isRestPeriod = hours >= 12 && hours < 14;

  const isCurrentTask = (timeStr) => {
    try {
      const [start, end] = timeStr.split("-").map((s) => s.trim());
      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);
      const nowH = currentDate.getHours();
      const nowM = currentDate.getMinutes();

      const startMins = sh * 60 + sm;
      const endMins = eh * 60 + em;
      const currentMins = nowH * 60 + nowM;

      return currentMins >= startMins && currentMins < endMins;
    } catch (e) {
      return false;
    }
  };

  const calculateStreak = () => {
    let streak = 0;
    let d = new Date();
    const todayStr = d.toLocaleDateString("en-CA");
    if (historyData[todayStr] && historyData[todayStr].length > 0) streak++;
    d.setDate(d.getDate() - 1);
    while (true) {
      let dateStr = d.toLocaleDateString("en-CA");
      if (historyData[dateStr] && historyData[dateStr].length > 0) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getTaskCounts = () => {
    const counts = {
      workout: 0,
      self: 0,
      class: 0,
      focus: 0,
      creative: 0,
      tech: 0,
      rest: 0,
      total: 0,
      diary: 0,
    };
    // 统计打卡
    Object.values(historyData)
      .flat()
      .forEach((taskId) => {
        counts.total++;
        for (const day in scheduleData) {
          const task = scheduleData[day].find((t) => t.id === taskId);
          if (task) {
            counts[task.type] = (counts[task.type] || 0) + 1;
            break;
          }
        }
      });
    // 统计日记
    counts.diary = Object.keys(diaryEntries).length;
    counts.total += counts.diary * 2; // 每篇日记算作2个任务的经验值权重
    return counts;
  };

  // 成就解锁检测
  useEffect(() => {
    if (!isReady) return;
    const counts = getTaskCounts();
    const totalXP = counts.total * 10;
    const currentStats = {
      ...counts,
      streak: calculateStreak(),
      level: getLevelInfo(totalXP).level,
    };

    let newUnlocks = [];
    ACHIEVEMENTS.forEach((ach) => {
      if (!unlockedIds.includes(ach.id) && ach.condition(currentStats)) {
        newUnlocks.push(ach.id);
      }
    });

    if (newUnlocks.length > 0) {
      const updated = [...unlockedIds, ...newUnlocks];
      setUnlockedIds(updated);
      localStorage.setItem("flow_state_achievements", JSON.stringify(updated));

      if (newUnlocks.length === 1) {
        const ach = ACHIEVEMENTS.find((a) => a.id === newUnlocks[0]);
        setToastMsg(`🏆 解锁新成就：${ach.title}！`);
      } else {
        setToastMsg(`🏆 连续解锁 ${newUnlocks.length} 个新成就！`);
      }
      setTimeout(() => setToastMsg(null), 4000);
    }
  }, [historyData, diaryEntries, isReady]);

  // --- 日记功能函数 ---
  const handleDiaryChange = (field, value) => {
    setCurrentDiary((prev) => ({ ...prev, [field]: value }));
  };

  const saveDiary = () => {
    const todayStr = new Date().toLocaleDateString("en-CA");
    const newEntries = { ...diaryEntries, [todayStr]: currentDiary };

    // 检查是否全为空
    const isEmpty =
      !currentDiary.happy.trim() &&
      !currentDiary.unhappy.trim() &&
      !currentDiary.reflection.trim() &&
      !currentDiary.other.trim();
    if (isEmpty) {
      setToastMsg("📝 至少写点什么再保存吧！");
      setTimeout(() => setToastMsg(null), 2500);
      return;
    }

    setDiaryEntries(newEntries);
    localStorage.setItem("flow_state_diary", JSON.stringify(newEntries));

    setToastMsg("📖 日记已封存！+20 经验值 ✨");
    setTimeout(() => setToastMsg(null), 2500);
  };

  // 打卡切换
  const toggleTask = (taskId) => {
    const isCompleting = !checkedTasks.includes(taskId);
    let newTasks;

    if (isCompleting) {
      newTasks = [...checkedTasks, taskId];
      if (!toastMsg) {
        setToastMsg("任务完成！+10 经验值 ✨");
        setTimeout(() => setToastMsg(null), 2500);
      }
    } else {
      newTasks = checkedTasks.filter((id) => id !== taskId);
    }

    setCheckedTasks(newTasks);
    const todayStr = new Date().toLocaleDateString("en-CA");
    const newHistory = { ...historyData, [todayStr]: newTasks };
    setHistoryData(newHistory);
    localStorage.setItem("flow_state_logs", JSON.stringify(newHistory));
  };

  // 课表编辑功能
  const handleScheduleChange = (day, index, field, value) => {
    const newSchedule = { ...scheduleData };
    newSchedule[day][index][field] = value;
    setScheduleData(newSchedule);
  };
  const addTask = (day) => {
    const newSchedule = { ...scheduleData };
    if (!newSchedule[day]) newSchedule[day] = [];
    newSchedule[day].push({
      id: `task_${Date.now()}`,
      time: "00:00 - 00:00",
      title: "新任务",
      desc: "任务描述",
      type: "focus",
    });
    setScheduleData(newSchedule);
  };
  const removeTask = (day, index) => {
    const newSchedule = { ...scheduleData };
    newSchedule[day].splice(index, 1);
    setScheduleData(newSchedule);
  };
  const saveSchedule = () => {
    localStorage.setItem("flow_state_schedule", JSON.stringify(scheduleData));
    setIsEditing(false);
  };
  const resetToDefault = () => {
    if (window.confirm("确定要恢复初始默认课表吗？你自定义的内容将丢失。")) {
      setScheduleData(defaultSchedule);
      localStorage.setItem(
        "flow_state_schedule",
        JSON.stringify(defaultSchedule)
      );
    }
  };

  // 计算界面所需数值
  const completedCount = checkedTasks.length;
  const progressPercent =
    todayTasks.length > 0
      ? Math.round((completedCount / todayTasks.length) * 100)
      : 0;
  const currentStreak = calculateStreak();
  const counts = getTaskCounts();
  const totalXP = counts.total * 10;
  const { level, title, min, max } = getLevelInfo(totalXP);
  const levelProgress = Math.min(
    100,
    Math.round(((totalXP - min) / (max - min)) * 100)
  );

  // ================= 渲染：心流日记 =================
  if (showDiary) {
    const sortedDiaryKeys = Object.keys(diaryEntries).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 pb-24 transition-colors duration-500">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transition-colors duration-500">
          {/* Header */}
          <div className="bg-teal-500 p-6 md:p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <PenTool className="w-8 h-8" /> {t("journal.title")}
              </h1>
              <p className="text-teal-100 mt-2 text-sm">
                {t("journal.subtitle")}
              </p>
            </div>
            <button
              onClick={() => setShowDiary(false)}
              className="relative z-10 p-2 bg-teal-400 rounded-full hover:bg-teal-300 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <BookHeart className="absolute -right-4 -bottom-4 w-40 h-40 text-teal-400 opacity-20" />
          </div>

          {/* 模式切换 Tabs */}
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setDiaryMode("write")}
              className={`flex-1 py-4 font-bold flex justify-center items-center gap-2 transition ${
                diaryMode === "write"
                  ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <PenTool className="w-5 h-5" /> {t("journal.tabWrite")}
            </button>
            <button
              onClick={() => setDiaryMode("history")}
              className={`flex-1 py-4 font-bold flex justify-center items-center gap-2 transition ${
                diaryMode === "history"
                  ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <History className="w-5 h-5" /> {t("journal.tabHistory")}
            </button>
          </div>

          {/* 内容区 */}
          <div className="p-4 md:p-8 max-h-[70vh] overflow-y-auto hide-scrollbar bg-slate-50">
            {diaryMode === "write" ? (
              <div className="space-y-6">
                {/* 1. 开心 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-green-100 transition">
                  <h3 className="text-green-600 font-bold flex items-center gap-2 mb-3">
                    <Smile className="w-5 h-5" />
                    {t("journal.q1Title")}
                  </h3>
                  <textarea
                    value={currentDiary.happy}
                    onChange={(e) => handleDiaryChange("happy", e.target.value)}
                    placeholder={t("journal.q1Placeholder")}
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 2. 不开心 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-slate-200 transition">
                  <h3 className="text-slate-500 font-bold flex items-center gap-2 mb-3">
                    <Frown className="w-5 h-5" /> {t("journal.q2Title")}
                  </h3>
                  <textarea
                    value={currentDiary.unhappy}
                    onChange={(e) =>
                      handleDiaryChange("unhappy", e.target.value)
                    }
                    placeholder={t("journal.q2Placeholder")}
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 3. 感悟 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-yellow-100 transition">
                  <h3 className="text-yellow-600 font-bold flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5" /> {t("journal.q3Title")}
                  </h3>
                  <textarea
                    value={currentDiary.reflection}
                    onChange={(e) =>
                      handleDiaryChange("reflection", e.target.value)
                    }
                    placeholder={t("journal.q3Placeholder")}
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 4. 其他 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-indigo-100 transition">
                  <h3 className="text-indigo-500 font-bold flex items-center gap-2 mb-3">
                    <AlignLeft className="w-5 h-5" /> {t("journal.q4Title")}
                  </h3>
                  <textarea
                    value={currentDiary.other}
                    onChange={(e) => handleDiaryChange("other", e.target.value)}
                    placeholder={t("journal.emptyHistory")}
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
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
        </div>
      </div>
    );
  }

  // ================= 渲染：成就陈列室 =================
  if (showAchievements) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 pb-24 transition-colors duration-500">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-yellow-500 p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Award className="w-8 h-8" /> {t("achievementsUI.title")}
              </h1>
              <p className="text-yellow-100 mt-2">
                {t("achievementsUI.unlockedPrefix")} {unlockedIds.length} /{" "}
                {ACHIEVEMENTS.length} {t("achievementsUI.unlockedSuffix")}
              </p>
            </div>
            <button
              onClick={() => setShowAchievements(false)}
              className="relative z-10 p-2 bg-yellow-400 rounded-full hover:bg-yellow-300 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <Medal className="absolute -right-4 -bottom-4 w-40 h-40 text-yellow-400 opacity-30" />
          </div>

          <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto hide-scrollbar">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedIds.includes(ach.id);
              const rConf = rarityConfig[ach.rarity];
              const AchIcon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 ${
                    isUnlocked
                      ? rConf.color
                      : "bg-slate-50 border-slate-100 opacity-50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full flex-shrink-0 ${
                      isUnlocked ? "bg-white/60 shadow-sm" : "bg-slate-200"
                    }`}
                  >
                    <AchIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg">
                        {t(`achievementsList.${ach.id}.title`)}
                      </h3>
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-md ${
                          isUnlocked
                            ? "bg-white/60"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {t(`achievementsList.${ach.id}.badge`)}
                      </span>
                    </div>
                    <p className="text-xs opacity-80">
                      {t(`achievementsList.${ach.id}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ================= 渲染：编辑模式 =================
  if (isEditing) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8 pb-24">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transition-colors duration-500">
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6" /> {t("modal.title")}
              </h1>
              <p className="text-indigo-200 text-sm mt-1">
                {t("modal.subtitle")}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-400 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex overflow-x-auto bg-slate-50 border-b border-slate-200 hide-scrollbar">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setEditingDay(index)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                  editingDay === index
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {(scheduleData[editingDay] || []).map((task, index) => (
              <div
                key={task.id}
                className="relative p-5 bg-slate-50 border border-slate-200 rounded-2xl group"
              >
                <button
                  onClick={() => removeTask(editingDay, index)}
                  className="absolute -top-3 -right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      {t("modal.timeSlot")}
                    </label>
                    <input
                      type="text"
                      value={task.time}
                      onChange={(e) =>
                        handleScheduleChange(
                          editingDay,
                          index,
                          "time",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      {t("modal.taskType")}
                    </label>
                    <select
                      value={task.type}
                      onChange={(e) =>
                        handleScheduleChange(
                          editingDay,
                          index,
                          "type",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                      {Object.entries(typeConfig).map(([key, config]) => (
                        <option key={key} value={key}>
                          {t(config.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      {t("modal.mainTitle")}
                    </label>
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) =>
                        handleScheduleChange(
                          editingDay,
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      {t("modal.desc")}
                    </label>
                    <input
                      type="text"
                      value={task.desc}
                      onChange={(e) =>
                        handleScheduleChange(
                          editingDay,
                          index,
                          "desc",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-600"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => addTask(editingDay)}
              className="w-full py-4 border-2 border-dashed border-indigo-300 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition flex justify-center items-center gap-2"
            >
              <Plus className="w-5 h-5" /> {t("modal.addTask")} (
              {weekDays[editingDay]})
            </button>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between">
            <button
              onClick={resetToDefault}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium px-4 py-2"
            >
              {t("modal.restoreDefault")}
            </button>
            <button
              onClick={saveSchedule}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> {t("modal.saveConfig")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 渲染：主界面 (打卡模式) =================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 relative overflow-hidden transition-colors duration-500">
      {/* 奖励浮窗提醒 */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-orange-200 flex items-center gap-2 whitespace-nowrap">
            <Trophy className="w-5 h-5" /> {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto dark:bg-slate-800 transition-colors duration-500">
        {/* Header 操作栏 */}
        <header className="mb-6">
          {/* 顶层：功能按钮组 */}
          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={() => setShowDiary(true)}
              className="px-3 py-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition flex items-center gap-1.5 text-sm font-medium"
            >
              <PenTool className="w-4 h-4" /> <span>{t("app.journal")}</span>
            </button>
            <button
              onClick={() => setShowAchievements(true)}
              className="px-3 py-2 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition flex items-center gap-1.5 text-sm font-medium"
            >
              <Award className="w-4 h-4" /> <span>{t("app.achievements")}</span>
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition flex items-center gap-1.5 text-sm font-medium"
            >
              <Settings className="w-4 h-4" /> <span>{t("app.customize")}</span>
            </button>
            <button
              onClick={handleExportData}
              className="px-3 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition flex items-center gap-1.5 text-sm font-medium"
            >
              <Download className="w-4 h-4" /> <span>{t("app.export")}</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="px-3 py-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition flex items-center gap-1.5 text-sm font-medium"
            >
              <Mail className="w-4 h-4" /> <span>{t("app.about")}</span>
            </button>
          </div>

          {/* 底层：标题与时间 */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {t("app.title")}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                {t("app.slogan")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-black text-indigo-600 tracking-wider">
                {currentDate.toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {i18n.language === "en"
                  ? weekDaysEn[dayOfWeek]
                  : weekDaysZh[dayOfWeek]}
              </p>
            </div>
          </div>

          {/* 系统设置栏：深色模式与中英切换 */}
          <div className="flex justify-end items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh")
              }
              className="w-8 h-6 flex items-center justify-center text-xs border border-slate-300 rounded opacity-40 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={
                i18n.language === "zh" ? "Switch to English" : "切换为中文"
              }
            >
              {i18n.language === "zh" ? "EN" : "ZH"}
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-6 flex items-center justify-center text-xs border border-slate-300 rounded opacity-40 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={isDarkMode ? "切换为浅色" : "Switch to Dark Mode"}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </header>
        {/* 游戏化等级与连胜面板 */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-3xl p-6 text-white shadow-lg mb-6 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-500/50 p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-indigo-200 uppercase tracking-widest">
                  LEVEL {level}
                </p>
                <p className="text-lg font-bold">
                  {t(`levels.level_${level}`)}
                </p>
              </div>
            </div>
            <div className="w-full bg-indigo-950/50 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-indigo-300">
              <span>{totalXP} XP</span>
              <span>{max} XP</span>
            </div>
          </div>

          <div className="w-px h-16 bg-indigo-500/30 mx-6"></div>

          <div className="text-center flex flex-col items-center">
            <div
              className={`p-3 rounded-full mb-1 ${
                currentStreak > 0
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-slate-700/50 text-slate-500"
              }`}
            >
              <Flame
                className={`w-7 h-7 ${
                  currentStreak > 0 ? "fill-orange-400 animate-pulse" : ""
                }`}
              />
            </div>
            <p className="text-xs font-bold text-indigo-100">
              {t("app.streak")}{" "}
              <span className="text-white text-lg">{currentStreak}</span>{" "}
              {t("app.days")}
            </p>
          </div>
        </div>
        {/* 绝对回血期提醒 */}
        {isRestPeriod && (
          <div className="mb-6 bg-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 border-2 border-emerald-400 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <Coffee className="w-8 h-8" />
              <h2 className="text-2xl font-bold">绝对回血期激活</h2>
            </div>
            <p className="text-emerald-50 text-lg">
              当前是 12:00 - 14:00。放下书本，离开代码。
              <br />
              去吃饭、午休、或者彻底放空。你的大脑需要电量来维持天赋。
            </p>
          </div>
        )}
        {/* 今日打卡时间线 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />{" "}
              {t("tasks.dailyFocus")}
            </h2>
            <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
              {t("tasks.progress")} {progressPercent}%
            </span>
          </div>

          {todayTasks.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-slate-400">{t("tasks.emptyState")}</p>
            </div>
          )}

          {todayTasks.map((task) => {
            const isChecked = checkedTasks.includes(task.id);
            const config = typeConfig[task.type] || typeConfig["default"];
            const TaskIcon = config.icon;

            // 判断是否是当下正在进行的任务
            const isActiveNow = isCurrentTask(task.time);

            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`relative flex p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer items-start gap-4 
                ${
                  isChecked
                    ? "bg-slate-50 border-slate-200 opacity-60 dark:bg-slate-800/50 dark:border-slate-700"
                    : isActiveNow
                    ? "bg-white border-indigo-400 shadow-lg shadow-indigo-100 transform scale-[1.02] ring-4 ring-indigo-50 dark:bg-slate-800 dark:shadow-indigo-900/20 dark:ring-indigo-900/30"
                    : "bg-white border-transparent shadow-sm hover:shadow-md hover:border-indigo-100 dark:bg-slate-800 dark:border-slate-700"
                }`}
              >
                {/* 动态进行中标签 */}
                {isActiveNow && !isChecked && (
                  <div className="absolute -top-3 right-6 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                    <BellRing className="w-3 h-3" /> 进行中
                  </div>
                )}

                <div className="mt-1 flex-shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                  ) : (
                    <Circle
                      className={`w-6 h-6 ${
                        isActiveNow ? "text-indigo-300" : "text-slate-300"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-sm font-semibold tracking-wider ${
                        isActiveNow && !isChecked
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {task.time}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-bold border ${config.color}`}
                    >
                      {t(config.label)}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isChecked
                        ? "text-slate-500 line-through dark:text-slate-600"
                        : "text-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isChecked
                        ? "text-slate-400 dark:text-slate-600"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {task.desc}
                  </p>
                </div>

                <div className="flex-shrink-0 mt-3 text-slate-200">
                  <TaskIcon
                    className={`w-8 h-8 ${
                      isChecked
                        ? "opacity-50"
                        : isActiveNow
                        ? "text-indigo-200"
                        : "text-slate-300"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>{t("app.footerQuote")}</p>
        </footer>
        {/* ☕ 打赏模态框 */}
        {showDonate && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white p-6 md:p-8 rounded-3xl max-w-sm w-full shadow-2xl relative">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  {t("app.coffee")}
                </h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  {t("app.donateDesc1")}
                  <br />
                  {t("app.donateDesc2")}
                </p>
              </div>

              {/* 二维码区域（单微信版） */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-48 aspect-square bg-slate-50 rounded-2xl border-2 border-slate-100 p-2 overflow-hidden mb-3 shadow-inner">
                  <img
                    src="/wechat.jpg"
                    alt="微信赞助"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  {t("donate.wechatPay")}
                </span>
              </div>

              <button
                onClick={() => setShowDonate(false)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition duration-200"
              >
                {t("donate.nextTime")}
              </button>
            </div>
          </div>
        )}
        {/* ✉️ 关于与公告模态框 */}
        {showAbout && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  {t("about.title")}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p>{t("about.intro")}</p>

                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-lg">🔒</span>{" "}
                    {t("about.privacyTitle")}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {t("about.privacyDesc")}
                  </p>
                </div>
                {/* 📱 数据同步提醒 */}
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
                  <p className="font-bold text-orange-800 mb-1 flex items-center gap-1.5 text-xs">
                    <span className="text-sm">⚠️</span>{" "}
                    {t("about.warningTitle")}
                  </p>
                  <p className="text-orange-700 text-[10px] leading-relaxed">
                    {t("about.warningDescFull")}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-lg">✉️</span>{" "}
                    {t("about.contactTitle")}
                  </p>
                  <p className="text-slate-500 text-xs mb-2">
                    {t("about.contactDesc")}
                  </p>
                  <a
                    href="mailto:guo15849323279@163.com"
                    className="inline-block text-emerald-600 font-mono font-bold bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
                  >
                    guo15849323279@163.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowAbout(false)}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold transition duration-200 shadow-lg shadow-slate-200"
              >
                {t("about.closeBtn")}
              </button>
            </div>
          </div>
        )}
        {/* ================= 底部页脚区域 ================= */}
        <div className="mt-16 pb-8 border-t border-slate-200 pt-8 flex flex-col items-center justify-center text-slate-400">
          <button
            onClick={() => setShowDonate(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-500 rounded-full transition-all duration-300"
          >
            <Coffee className="w-4 h-4" />
            <span className="text-sm font-bold">{t("app.coffee")}</span>
          </button>

          {/* 极客专属签名 */}
          <p className="mt-6 text-xs tracking-widest uppercase opacity-60">
            Designed & Built by ZAI
          </p>
        </div>{" "}
      </div>
    </div>
  );
}
