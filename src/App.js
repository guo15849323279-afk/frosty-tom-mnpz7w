import React, { useState, useEffect } from "react";
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
  1: [
    {
      id: "mon_1",
      time: "08:00 - 12:00",
      title: "深度工作 / 核心课程",
      desc: "唯一下午不排满的一天，专注听讲",
      type: "class",
    },
    {
      id: "mon_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "禁止学习，吃饭/午休/看剧",
      type: "rest",
    },
    {
      id: "mon_3",
      time: "14:00 - 16:00",
      title: "外语冲刺 / 技能练习",
      desc: "保持手感和语感",
      type: "focus",
    },
    {
      id: "mon_4",
      time: "16:00 - 18:00",
      title: "钢铁之躯：健身房",
      desc: "无氧力量 + 有氧，拉满内啡肽",
      type: "workout",
    },
    {
      id: "mon_5",
      time: "19:30 - 21:30",
      title: "AI 深度交流 / 前沿探索",
      desc: "探讨前沿公式、写代码",
      type: "tech",
    },
  ],
  2: [
    {
      id: "tue_1",
      time: "08:00 - 12:00",
      title: "图书馆闭关：极简自学",
      desc: "1.5h 重点划线 + 真题",
      type: "self",
    },
    {
      id: "tue_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "禁止学习，吃饭/午休/发呆",
      type: "rest",
    },
    {
      id: "tue_3",
      time: "14:00 - 16:00",
      title: "外语冲刺 / 技能练习",
      desc: "保持手感和语感",
      type: "focus",
    },
    {
      id: "tue_4",
      time: "16:00 - 18:00",
      title: "钢铁之躯：健身房",
      desc: "无氧力量 + 有氧，拉满内啡肽",
      type: "workout",
    },
    {
      id: "tue_6",
      time: "21:30 - 23:00",
      title: "视觉创作 / 爱好输出",
      desc: "尝试AI辅助创作",
      type: "creative",
    },
  ],
  3: [
    {
      id: "wed_1",
      time: "08:00 - 12:00",
      title: "深度工作 / 核心课程",
      desc: "课后直奔图书馆，2倍速速刷网课",
      type: "class",
    },
    {
      id: "wed_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "彻底断联，恢复精力",
      type: "rest",
    },
    {
      id: "wed_3",
      time: "14:00 - 16:00",
      title: "外语冲刺 / 技能练习",
      desc: "保持手感和语感",
      type: "focus",
    },
    {
      id: "wed_4",
      time: "16:00 - 18:00",
      title: "钢铁之躯：健身房",
      desc: "无氧力量 + 有氧，拉满内啡肽",
      type: "workout",
    },
    {
      id: "wed_5",
      time: "19:30 - 21:30",
      title: "AI 深度交流 / 变现探索",
      desc: "探索变现项目",
      type: "tech",
    },
  ],
  4: [
    {
      id: "thu_1",
      time: "08:00 - 12:00",
      title: "图书馆闭关：极简自学",
      desc: "搞定平时作业与阅读套题",
      type: "self",
    },
    {
      id: "thu_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "禁止学习，吃饭/午休/看剧",
      type: "rest",
    },
    {
      id: "thu_3",
      time: "14:00 - 16:00",
      title: "外语口语 / 技能进阶",
      desc: "利用AI练口语，熟悉新技能",
      type: "focus",
    },
    {
      id: "thu_4",
      time: "16:00 - 17:40",
      title: "通识课程 / 碎片整理",
      desc: "教室上课或整理笔记",
      type: "class",
    },
    {
      id: "thu_5",
      time: "18:00 - 19:30",
      title: "钢铁之躯：健身房",
      desc: "错峰训练，高强度压缩",
      type: "workout",
    },
  ],
  5: [
    {
      id: "fri_1",
      time: "08:00 - 12:00",
      title: "深度工作 / 极简自学",
      desc: "清理本周遗留",
      type: "class",
    },
    {
      id: "fri_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "彻底放松，迎接周末",
      type: "rest",
    },
    {
      id: "fri_3",
      time: "14:00 - 16:00",
      title: "模拟测试 / 技能保持",
      desc: "保持手感和语感",
      type: "focus",
    },
    {
      id: "fri_4",
      time: "16:00 - 18:00",
      title: "钢铁之躯：健身房",
      desc: "本周最后一次力量训练，力竭",
      type: "workout",
    },
    {
      id: "fri_6",
      time: "21:30 - 23:00",
      title: "视觉创作 / 灵感捕捉",
      desc: "整理素材",
      type: "creative",
    },
  ],
  6: [
    {
      id: "sat_1",
      time: "09:00 - 12:00",
      title: "弹性日：全真模考 / 爱好",
      desc: "睡到自然醒，状态好做模考",
      type: "focus",
    },
    {
      id: "sat_2",
      time: "12:00 - 14:00",
      title: "绝对回血期",
      desc: "尽情娱乐",
      type: "rest",
    },
    {
      id: "sat_3",
      time: "14:00 - 19:30",
      title: "查漏补缺 + AI 探讨",
      desc: "解决本周未解难题",
      type: "tech",
    },
    {
      id: "sat_4",
      time: "19:30 - 23:00",
      title: "自由狂欢",
      desc: "沉浸在自己的热爱中",
      type: "creative",
    },
  ],
  0: [
    {
      id: "sun_1",
      time: "08:00 - 20:00",
      title: "12小时极限心流日",
      desc: "纯粹的世界，脱离书本进行户外/深度创作。",
      type: "creative",
    },
    {
      id: "sun_2",
      time: "20:00 - 22:30",
      title: "素材归档与彻底放松",
      desc: "导卡、充电、听歌休息，准备新的一周",
      type: "rest",
    },
  ],
};

// --- 类型与图标映射 ---
const typeConfig = {
  class: {
    label: "课程",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: BookOpen,
  },
  self: {
    label: "自学",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: BookOpen,
  },
  rest: {
    label: "休息",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: Coffee,
  },
  focus: {
    label: "专注",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: Music,
  },
  workout: {
    label: "运动",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: Dumbbell,
  },
  tech: {
    label: "科技",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: BrainCircuit,
  },
  creative: {
    label: "创作",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Video,
  },
  default: {
    label: "通用",
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: CheckCircle2,
  },
};

const weekDays = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

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
    title: "初出茅庐",
    desc: "成功完成你的第 1 个任务",
    rarity: "common",
    condition: (s) => s.total >= 1,
    icon: Star,
  },
  {
    id: "task_10",
    title: "渐入佳境",
    desc: "累计完成 10 个任务",
    rarity: "common",
    condition: (s) => s.total >= 10,
    icon: Star,
  },
  {
    id: "task_50",
    title: "百炼成钢",
    desc: "累计完成 50 个任务",
    rarity: "rare",
    condition: (s) => s.total >= 50,
    icon: Target,
  },
  {
    id: "task_200",
    title: "千锤百炼",
    desc: "累计完成 200 个任务",
    rarity: "epic",
    condition: (s) => s.total >= 200,
    icon: Sparkles,
  },
  {
    id: "task_500",
    title: "心流宗师",
    desc: "累计完成 500 个任务",
    rarity: "legendary",
    condition: (s) => s.total >= 500,
    icon: Crown,
  },
  {
    id: "task_1000",
    title: "极简大成",
    desc: "累计完成 1000 个任务，无与伦比的毅力",
    rarity: "legendary",
    condition: (s) => s.total >= 1000,
    icon: Gem,
  },

  // 连胜 (8)
  {
    id: "streak_3",
    title: "三日之约",
    desc: "达成 3 天连胜",
    rarity: "common",
    condition: (s) => s.streak >= 3,
    icon: Flame,
  },
  {
    id: "streak_7",
    title: "七日奇迹",
    desc: "达成 7 天连胜",
    rarity: "rare",
    condition: (s) => s.streak >= 7,
    icon: Flame,
  },
  {
    id: "streak_14",
    title: "坚持不懈",
    desc: "达成 14 天连胜",
    rarity: "rare",
    condition: (s) => s.streak >= 14,
    icon: Flame,
  },
  {
    id: "streak_21",
    title: "习惯养成",
    desc: "达成 21 天连胜，形成肌肉记忆",
    rarity: "epic",
    condition: (s) => s.streak >= 21,
    icon: Flame,
  },
  {
    id: "streak_30",
    title: "满月之誓",
    desc: "达成 30 天连胜",
    rarity: "epic",
    condition: (s) => s.streak >= 30,
    icon: Flame,
  },
  {
    id: "streak_50",
    title: "不可阻挡",
    desc: "达成 50 天连胜",
    rarity: "legendary",
    condition: (s) => s.streak >= 50,
    icon: Flame,
  },
  {
    id: "streak_100",
    title: "百日筑基",
    desc: "连续 100 天没有中断",
    rarity: "legendary",
    condition: (s) => s.streak >= 100,
    icon: Trophy,
  },
  {
    id: "streak_365",
    title: "岁月史书",
    desc: "达成 365 天连胜，你创造了奇迹",
    rarity: "legendary",
    condition: (s) => s.streak >= 365,
    icon: Crown,
  },

  // 等级 (5)
  {
    id: "level_2",
    title: "进阶行者",
    desc: "账号达到 2 级",
    rarity: "common",
    condition: (s) => s.level >= 2,
    icon: Zap,
  },
  {
    id: "level_3",
    title: "自律达人",
    desc: "账号达到 3 级",
    rarity: "rare",
    condition: (s) => s.level >= 3,
    icon: Zap,
  },
  {
    id: "level_4",
    title: "心流大师",
    desc: "账号达到 4 级",
    rarity: "epic",
    condition: (s) => s.level >= 4,
    icon: Zap,
  },
  {
    id: "level_5",
    title: "时间领主",
    desc: "账号达到 5 级",
    rarity: "legendary",
    condition: (s) => s.level >= 5,
    icon: Zap,
  },
  {
    id: "level_10",
    title: "维度掌控者",
    desc: "账号达到 10 级",
    rarity: "legendary",
    condition: (s) => s.level >= 10,
    icon: Crown,
  },

  // 健身运动 (5)
  {
    id: "work_1",
    title: "唤醒肌肉",
    desc: "完成第 1 次运动打卡",
    rarity: "common",
    condition: (s) => s.workout >= 1,
    icon: Dumbbell,
  },
  {
    id: "work_10",
    title: "钢铁之躯",
    desc: "累计完成 10 次运动打卡",
    rarity: "rare",
    condition: (s) => s.workout >= 10,
    icon: Dumbbell,
  },
  {
    id: "work_50",
    title: "挥汗如雨",
    desc: "累计完成 50 次运动打卡",
    rarity: "epic",
    condition: (s) => s.workout >= 50,
    icon: Dumbbell,
  },
  {
    id: "work_100",
    title: "塑形狂魔",
    desc: "累计完成 100 次运动打卡",
    rarity: "epic",
    condition: (s) => s.workout >= 100,
    icon: Dumbbell,
  },
  {
    id: "work_300",
    title: "健身房NPC",
    desc: "累计完成 300 次运动，人类高质量肉体",
    rarity: "legendary",
    condition: (s) => s.workout >= 300,
    icon: Dumbbell,
  },

  // 深度学习/学业 (5)
  {
    id: "stu_1",
    title: "知识之海",
    desc: "完成第 1 次自学或核心课程",
    rarity: "common",
    condition: (s) => s.self + s.class >= 1,
    icon: BookOpen,
  },
  {
    id: "stu_10",
    title: "学海无涯",
    desc: "累计完成 10 次学术/自学任务",
    rarity: "rare",
    condition: (s) => s.self + s.class >= 10,
    icon: BookOpen,
  },
  {
    id: "stu_50",
    title: "挑灯夜战",
    desc: "累计完成 50 次学术/自学任务",
    rarity: "epic",
    condition: (s) => s.self + s.class >= 50,
    icon: BookOpen,
  },
  {
    id: "stu_100",
    title: "核心壁垒",
    desc: "累计完成 100 次学术/自学任务",
    rarity: "epic",
    condition: (s) => s.self + s.class >= 100,
    icon: BookOpen,
  },
  {
    id: "stu_300",
    title: "知识即力量",
    desc: "累计完成 300 次学术探索",
    rarity: "legendary",
    condition: (s) => s.self + s.class >= 300,
    icon: BookOpen,
  },

  // 技能/专注 (雅思/吉他等) (5)
  {
    id: "foc_1",
    title: "全神贯注",
    desc: "开启第 1 次技能专注时刻",
    rarity: "common",
    condition: (s) => s.focus >= 1,
    icon: Target,
  },
  {
    id: "foc_10",
    title: "沉浸时刻",
    desc: "累计专注技能 10 次",
    rarity: "rare",
    condition: (s) => s.focus >= 10,
    icon: Target,
  },
  {
    id: "foc_50",
    title: "绝对专注",
    desc: "累计专注技能 50 次",
    rarity: "epic",
    condition: (s) => s.focus >= 50,
    icon: Target,
  },
  {
    id: "foc_100",
    title: "技艺精进",
    desc: "累计专注技能 100 次",
    rarity: "epic",
    condition: (s) => s.focus >= 100,
    icon: Target,
  },
  {
    id: "foc_300",
    title: "肌肉记忆",
    desc: "累计专注 300 次，手到擒来",
    rarity: "legendary",
    condition: (s) => s.focus >= 300,
    icon: Target,
  },

  // 科技/AI (4)
  {
    id: "tech_1",
    title: "硅基对话",
    desc: "完成第 1 次 AI 与科技探索",
    rarity: "common",
    condition: (s) => s.tech >= 1,
    icon: BrainCircuit,
  },
  {
    id: "tech_10",
    title: "极客觉醒",
    desc: "累计完成 10 次科技探索",
    rarity: "rare",
    condition: (s) => s.tech >= 10,
    icon: Cpu,
  },
  {
    id: "tech_50",
    title: "代码织布机",
    desc: "累计完成 50 次科技与编程实践",
    rarity: "epic",
    condition: (s) => s.tech >= 50,
    icon: Code,
  },
  {
    id: "tech_100",
    title: "AI造物主",
    desc: "累计探索科技领域 100 次",
    rarity: "legendary",
    condition: (s) => s.tech >= 100,
    icon: Rocket,
  },

  // 创作/视觉 (摄影/剪辑) (4)
  {
    id: "cre_1",
    title: "捕光捉影",
    desc: "完成第 1 次创意/视觉产出",
    rarity: "common",
    condition: (s) => s.creative >= 1,
    icon: Camera,
  },
  {
    id: "cre_10",
    title: "灵感如泉",
    desc: "累计完成 10 次创作",
    rarity: "rare",
    condition: (s) => s.creative >= 10,
    icon: Lightbulb,
  },
  {
    id: "cre_50",
    title: "视觉造梦师",
    desc: "累计完成 50 次深度创作",
    rarity: "epic",
    condition: (s) => s.creative >= 50,
    icon: Video,
  },
  {
    id: "cre_100",
    title: "传世之作",
    desc: "累计创作 100 次，个人品牌成型",
    rarity: "legendary",
    condition: (s) => s.creative >= 100,
    icon: Gem,
  },

  // 休息与恢复 (4)
  {
    id: "rest_1",
    title: "适时停歇",
    desc: "完成第 1 次绝对回血",
    rarity: "common",
    condition: (s) => s.rest >= 1,
    icon: Coffee,
  },
  {
    id: "rest_10",
    title: "张弛有度",
    desc: "累计完成 10 次充足休息",
    rarity: "rare",
    condition: (s) => s.rest >= 10,
    icon: BatteryCharging,
  },
  {
    id: "rest_50",
    title: "回血大师",
    desc: "累计完成 50 次身心恢复",
    rarity: "epic",
    condition: (s) => s.rest >= 50,
    icon: Coffee,
  },
  {
    id: "rest_100",
    title: "绝对静心",
    desc: "累计完成 100 次冥想与休整",
    rarity: "legendary",
    condition: (s) => s.rest >= 100,
    icon: BatteryCharging,
  },

  // 日记系统专属成就 (2)
  {
    id: "diary_1",
    title: "心灵捕手",
    desc: "记录你的第一篇心流日记",
    rarity: "common",
    condition: (s) => s.diary >= 1,
    icon: PenTool,
  },
  {
    id: "diary_10",
    title: "岁月史官",
    desc: "累计记录 10 篇日记，直面内心",
    rarity: "epic",
    condition: (s) => s.diary >= 10,
    icon: BookHeart,
  },

  // 特殊组合成就 (3)
  {
    id: "combo_1",
    title: "文武双全",
    desc: "运动与学习均达到 10 次",
    rarity: "epic",
    condition: (s) => s.workout >= 10 && s.self + s.class >= 10,
    icon: Medal,
  },
  {
    id: "combo_2",
    title: "科技与艺术",
    desc: "科技与创作均达到 10 次",
    rarity: "epic",
    condition: (s) => s.tech >= 10 && s.creative >= 10,
    icon: Sparkles,
  },
  {
    id: "combo_3",
    title: "全能多面手",
    desc: "全面开花，所有维度突破 10",
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

  // 👇👇👇 刚刚粘贴的导出功能在这里 👇👇👇
  // 💾 数据导出功能
  const handleExportData = () => {
    // ... (导出的具体逻辑代码) ...
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

  const dayOfWeek = currentDate.getDay();
  const todayTasks = scheduleData[dayOfWeek] || [];
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
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-teal-500 p-6 md:p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <PenTool className="w-8 h-8" /> 心流日记
              </h1>
              <p className="text-teal-100 mt-2 text-sm">
                与自己对话，是最深度的复盘。
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
              <PenTool className="w-5 h-5" /> 今日沉淀
            </button>
            <button
              onClick={() => setDiaryMode("history")}
              className={`flex-1 py-4 font-bold flex justify-center items-center gap-2 transition ${
                diaryMode === "history"
                  ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50/30"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <History className="w-5 h-5" /> 过往回忆
            </button>
          </div>

          {/* 内容区 */}
          <div className="p-4 md:p-8 max-h-[70vh] overflow-y-auto hide-scrollbar bg-slate-50">
            {diaryMode === "write" ? (
              <div className="space-y-6">
                {/* 1. 开心 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-green-100 transition">
                  <h3 className="text-green-600 font-bold flex items-center gap-2 mb-3">
                    <Smile className="w-5 h-5" /> 1. 开心的事
                  </h3>
                  <textarea
                    value={currentDiary.happy}
                    onChange={(e) => handleDiaryChange("happy", e.target.value)}
                    placeholder="今天有什么小确幸？或者完成了什么挑战？"
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 2. 不开心 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-slate-200 transition">
                  <h3 className="text-slate-500 font-bold flex items-center gap-2 mb-3">
                    <Frown className="w-5 h-5" /> 2. 烦恼或阻碍
                  </h3>
                  <textarea
                    value={currentDiary.unhappy}
                    onChange={(e) =>
                      handleDiaryChange("unhappy", e.target.value)
                    }
                    placeholder="遇到了什么困难？情绪低落的原因是什么？写出来释放掉。"
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 3. 感悟 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-yellow-100 transition">
                  <h3 className="text-yellow-600 font-bold flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5" /> 3. 今日感悟
                  </h3>
                  <textarea
                    value={currentDiary.reflection}
                    onChange={(e) =>
                      handleDiaryChange("reflection", e.target.value)
                    }
                    placeholder="从今天的经历中学到了什么？有什么可以改进的地方？"
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>
                {/* 4. 其他 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm focus-within:ring-2 ring-indigo-100 transition">
                  <h3 className="text-indigo-500 font-bold flex items-center gap-2 mb-3">
                    <AlignLeft className="w-5 h-5" /> 4. 碎片记录 (其他)
                  </h3>
                  <textarea
                    value={currentDiary.other}
                    onChange={(e) => handleDiaryChange("other", e.target.value)}
                    placeholder="闪念、备忘、梦境、或者随便写点什么..."
                    className="w-full h-24 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-300"
                  />
                </div>

                <button
                  onClick={saveDiary}
                  className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-600 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> 保存今日日记
                </button>
              </div>
            ) : (
              /* 历史记录列表 */
              <div className="space-y-6">
                {sortedDiaryKeys.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    还没有写过日记，今天就开始记录吧。
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
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-yellow-500 p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Award className="w-8 h-8" /> 荣誉陈列室
              </h1>
              <p className="text-yellow-100 mt-2">
                已点亮 {unlockedIds.length} / {ACHIEVEMENTS.length} 个不凡印记
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
                  className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-500 ${
                    isUnlocked
                      ? rConf.color
                      : "bg-slate-50 border-slate-100 grayscale opacity-50"
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
                      <h3 className="font-bold text-lg">{ach.title}</h3>
                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-md ${
                          isUnlocked
                            ? "bg-white/60"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {rConf.label}
                      </span>
                    </div>
                    <p className="text-xs opacity-80">{ach.desc}</p>
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
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6" /> 自定义课表
              </h1>
              <p className="text-indigo-200 text-sm mt-1">
                打造属于你自己的心流节奏
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
                      时间段 (如 08:00 - 12:00)
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
                      任务类型
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
                          {config.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      主标题
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
                      描述 / 目标
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
              <Plus className="w-5 h-5" /> 添加新任务 ({weekDays[editingDay]})
            </button>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between">
            <button
              onClick={resetToDefault}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium px-4 py-2"
            >
              恢复默认模板
            </button>
            <button
              onClick={saveSchedule}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> 保存配置
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 渲染：主界面 (打卡模式) =================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* 奖励浮窗提醒 */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-orange-200 flex items-center gap-2 whitespace-nowrap">
            <Trophy className="w-5 h-5" /> {toastMsg}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header 操作栏 */}
        <header className="mb-6">
          {/* 顶层：功能按钮组 */}
          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={() => setShowDiary(true)}
              className="px-3 py-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <PenTool className="w-4 h-4" /> <span>日记</span>
            </button>
            <button
              onClick={() => setShowAchievements(true)}
              className="px-3 py-2 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <Award className="w-4 h-4" /> <span>成就</span>
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <Settings className="w-4 h-4" /> <span>定制</span>
            </button>
            <button
              onClick={() => setShowDonate(true)}
              className="px-3 py-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <Coffee className="w-4 h-4" /> <span>赞助</span>
            </button>
            <button
              onClick={handleExportData}
              className="px-3 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <Download className="w-4 h-4" /> <span>导出</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="px-3 py-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition flex items-center gap-1.5 text-sm font-bold bg-white border border-slate-100 shadow-sm"
            >
              <Mail className="w-4 h-4" /> <span>关于</span>
            </button>
          </div>

          {/* 底层：标题与时间 */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                极简·心流
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-2 font-medium">
                天赋加持，高效输出。少即是多。
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-black text-indigo-600 tracking-wider">
                {currentDate.toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
                {weekDays[dayOfWeek]}
              </p>
            </div>
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
                <p className="text-lg font-bold">{title}</p>
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
              连胜 <span className="text-white text-lg">{currentStreak}</span>{" "}
              天
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
              <Clock className="w-5 h-5 text-indigo-500" /> 今日战线
            </h2>
            <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
              进度 {progressPercent}%
            </span>
          </div>

          {todayTasks.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">
                今天没有安排任务，点击右上角"定制"添加。
              </p>
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
                      ? "bg-slate-50 border-slate-200 opacity-60"
                      : isActiveNow
                      ? "bg-white border-indigo-400 shadow-lg shadow-indigo-100 transform scale-[1.02] ring-4 ring-indigo-50"
                      : "bg-white border-transparent shadow-sm hover:shadow-md hover:border-indigo-100"
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
                          ? "text-indigo-600"
                          : "text-slate-400"
                      }`}
                    >
                      {task.time}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-bold border ${config.color}`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isChecked
                        ? "text-slate-500 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isChecked ? "text-slate-400" : "text-slate-600"
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
          <p>掌控时间，不断进化。</p>
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
                  请开发者喝杯咖啡
                </h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  如果你觉得这个工具对你有帮助，
                  <br />
                  欢迎打赏支持我的持续开发！
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
                  微信扫码，赞助开发者
                </span>
              </div>

              <button
                onClick={() => setShowDonate(false)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition duration-200"
              >
                下次一定 / 关闭
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
                  关于「极简·心流」
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p>
                  这原本是我为自己打造的效率工具，旨在摒弃一切干扰，专注于当下。很高兴它也能帮到你。
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-lg">🔒</span> 隐私承诺
                  </p>
                  <p className="text-slate-500 text-xs">
                    你的所有数据均保存在你的本地浏览器中，没有任何人能偷窥你的心血。
                  </p>
                </div>
                {/* 📱 数据同步提醒 */}
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
                  <p className="font-bold text-orange-800 mb-1 flex items-center gap-1.5 text-xs">
                    <span className="text-sm">⚠️</span> 重要提醒
                  </p>
                  <p className="text-orange-700 text-[10px] leading-relaxed">
                    由于数据完全本地化，
                    <strong>手机和电脑的数据是不互通的</strong>
                    。更换设备或清理浏览器缓存会导致数据丢失，建议定期使用“导出”功能备份。
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <span className="text-lg">✉️</span> 联系开发者
                  </p>
                  <p className="text-slate-500 text-xs mb-2">
                    如果有任何建议、Bug 反馈，欢迎随时发邮件给我：
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
                好的，继续专注
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
