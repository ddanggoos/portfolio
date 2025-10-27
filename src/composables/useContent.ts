import { ref, computed, readonly } from "vue";
import contentData from "@/data/content.json";

// 타입 정의
export interface Project {
  id: number;
  title: string;
  description: string;
  img?: string | null;
  icon: string;
  tags: string[];
  status: string;
}

export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: string;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  icon: string;
  company: string;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImg: string;
}

export interface ContentData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
}

// 반응형 데이터
const content = ref<ContentData>(contentData);
const profile = computed(() => content.value.profile);
export function useContent() {
  // 프로젝트 관련
  const projects = computed(() => content.value.projects);
  const completedProjects = computed(() =>
    content.value.projects.filter((project) => project.status === "완료")
  );
  const inProgressProjects = computed(() =>
    content.value.projects.filter((project) => project.status === "진행중")
  );

  // 스킬 관련
  const skills = computed(() => content.value.skills);
  const skillsByLevel = computed(() => {
    const grouped = content.value.skills.reduce((acc, skill) => {
      if (!acc[skill.level]) {
        acc[skill.level] = [];
      }
      acc[skill.level]!.push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
    return grouped;
  });

  // 경험 관련
  const experience = computed(() => content.value.experience);

  // 프로젝트 추가
  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id:
        content.value.projects.length > 0
          ? Math.max(...content.value.projects.map((p) => p.id)) + 1
          : 1,
    };
    content.value.projects.push(newProject);
  };

  // 프로젝트 업데이트
  const updateProject = (id: number, updates: Omit<Partial<Project>, "id">) => {
    const index = content.value.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      content.value.projects[index] = {
        ...content.value.projects[index]!,
        ...updates,
      };
    }
  };

  // 프로젝트 삭제
  const deleteProject = (id: number) => {
    content.value.projects = content.value.projects.filter((p) => p.id !== id);
  };

  // 스킬 추가
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill: Skill = {
      ...skill,
      id:
        content.value.skills.length > 0
          ? Math.max(...content.value.skills.map((s) => s.id)) + 1
          : 1,
    };
    content.value.skills.push(newSkill);
  };

  // 경험 추가
  const addExperience = (exp: Omit<Experience, "id">) => {
    const newExperience: Experience = {
      ...exp,
      id:
        content.value.experience.length > 0
          ? Math.max(...content.value.experience.map((e) => e.id)) + 1
          : 1,
    };
    content.value.experience.push(newExperience);
  };

  // 데이터 저장 (로컬 스토리지)
  const saveToLocalStorage = () => {
    localStorage.setItem("portfolio-content", JSON.stringify(content.value));
  };

  // 데이터 로드 (로컬 스토리지)
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("portfolio-content");
    if (saved) {
      try {
        content.value = JSON.parse(saved);
      } catch (error) {
        console.error("Failed to load content from localStorage:", error);
      }
    }
  };

  // 초기 로드
  loadFromLocalStorage();

  return {
    // 데이터
    content: readonly(content),
    projects,
    completedProjects,
    inProgressProjects,
    skills,
    skillsByLevel,
    experience,
    profile,

    // 메서드
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    addExperience,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
