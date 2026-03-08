// Blueprint Architect Design — About Section
// Profile of Angelo Marques de Oliveira Silva
// Tech Lead with 17+ years of experience

import { motion } from "framer-motion";
import { Linkedin, MapPin, Mail, Phone, ExternalLink, Award, Briefcase, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/patterns";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/about-tech_c9cf3336.jpg";
const PROFILE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663414674353/F6gxJ4RNcy9gwRasrrg2TY/profile-bg_071ceb19.jpg";

const experiences = [
  { company: "Outly", role: "Líder Técnico", period: "2025 – 2026", current: false },
  { company: "Osas Tecnologia", role: "Líder Técnico Sênior", period: "2024 – 2025", current: false },
  { company: "Niteo Technologies", role: "Desenvolvedor Sênior", period: "2023 – 2024", current: false },
  { company: "Gnose Tecnologia", role: "Proprietário / Consultor", period: "2016 – 2024", current: false },
  { company: "Grupo Barigui", role: "Full Stack / Arquiteto", period: "2023", current: false },
  { company: "Le Card", role: "Full Stack / Tech Lead", period: "2018 – 2022", current: false },
];

const skills = [
  { group: "Backend", items: ["C#", ".NET Core", "Java", "Entity Framework", "LINQ", "Blazor"] },
  { group: "Frontend", items: ["React", "Angular", "TypeScript", "HTML5", "CSS3", "SASS"] },
  { group: "DevOps / Cloud", items: ["Azure", "AWS", "Docker", "Kubernetes", "Kafka", "RabbitMQ"] },
  { group: "Database", items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis", "Cosmos DB"] },
  { group: "Arquitetura", items: ["DDD", "CQRS", "TDD", "BDD", "SOLID", "Clean Architecture"] },
  { group: "Ferramentas", items: ["Git", "Jira", "Azure DevOps", "SonarQube", "Cypress", "Figma"] },
];

const certifications = [
  "HTML Básico",
  "Curso Completo de CSS",
  "Lógica de Programação I – UFES",
  "Microsoft SharePoint",
];

export default function AboutSection() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const bioText = lang === "pt"
    ? "Sou Desenvolvedor Full Stack com mais de 17 anos de experiência na área de tecnologia. Nos últimos 10 anos venho me especializando em desenvolvimento de Aplicações Web, API REST, Mobile e Windows. Atuo com metodologia ágil e Scrum, utilizando padrões como TDD, DDD, BDD, SOLID, Clean Code e Clean Architecture. Tenho habilidade no gerenciamento do ciclo de desenvolvimento de software, abrangendo identificação de necessidades, levantamento de requisitos, arquitetura de software e documentação técnica."
    : "I am a Full Stack Developer with over 17 years of experience in technology. For the last 10 years I have been specializing in Web Application development, REST APIs, Mobile and Windows platforms. I work with agile methodology and Scrum, using patterns like TDD, DDD, BDD, SOLID, Clean Code and Clean Architecture. I have skills in managing the full software development lifecycle, covering needs identification, requirements gathering, software architecture and technical documentation.";

  return (
    <section id="about" className="relative py-24 bg-[#0a0e14] overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e14] via-transparent to-[#0a0e14]" />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-full px-4 py-1.5 mb-4">
            <Award className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="text-[#58a6ff] text-sm font-medium">{t.about.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Angelo Marques
          </h2>
          <p className="text-[#58a6ff] text-lg font-medium">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden sticky top-24">
              {/* Profile image area */}
              <div
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${PROFILE_BG})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#161b22]" />
              </div>

              {/* Avatar placeholder */}
              <div className="px-6 pb-6 -mt-8 relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#3fb950] flex items-center justify-center text-2xl font-black text-[#0d1117] mb-4 border-4 border-[#161b22]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  A
                </div>

                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Angelo Marques de Oliveira Silva
                </h3>
                <p className="text-[#58a6ff] text-sm mb-4">Tech Lead | Full Stack Developer</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[#8b949e] text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Serra, Espírito Santo, Brasil</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8b949e] text-xs">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>angelomarquesdeoliveira@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8b949e] text-xs">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>+55 27 99784-0733</span>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/angelomarquesdeoliveirasilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#0a66c2] hover:bg-[#0a66c2]/80 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  {t.about.connect}
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Languages */}
                <div className="mt-4 pt-4 border-t border-[#30363d]">
                  <p className="text-[#8b949e] text-xs font-medium mb-2">
                    {lang === "pt" ? "Idiomas" : "Languages"}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#21262d] text-[#c9d1d9] px-2 py-1 rounded">🇧🇷 Português (Nativo)</span>
                    <span className="text-xs bg-[#21262d] text-[#c9d1d9] px-2 py-1 rounded">🇺🇸 English</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-4 pt-4 border-t border-[#30363d]">
                  <p className="text-[#8b949e] text-xs font-medium mb-2">
                    {lang === "pt" ? "Certificações" : "Certifications"}
                  </p>
                  <div className="space-y-1">
                    {certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                        <div className="w-1 h-1 rounded-full bg-[#58a6ff]" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Experience + Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4 text-[#58a6ff]" />
                <h3 className="text-white font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.about.bio_title}
                </h3>
              </div>
              <p className="text-[#8b949e] text-sm leading-relaxed">{bioText}</p>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#30363d]">
                {[
                  { value: "17+", label: lang === "pt" ? "Anos de Exp." : "Years Exp.", color: "text-[#58a6ff]" },
                  { value: "10+", label: lang === "pt" ? "Empresas" : "Companies", color: "text-[#3fb950]" },
                  { value: "20+", label: lang === "pt" ? "Tecnologias" : "Technologies", color: "text-[#d29922]" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-2xl font-black ${stat.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-[#8b949e] text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-4 h-4 text-[#3fb950]" />
                <h3 className="text-white font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.about.experience_title}
                </h3>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-[#30363d]" />
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 pl-8 relative"
                    >
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#21262d] border-2 border-[#3fb950]/40 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-semibold">{exp.company}</p>
                            <p className="text-[#58a6ff] text-xs">{exp.role}</p>
                          </div>
                          <span className="text-[#8b949e] text-xs shrink-0">{exp.period}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-4 h-4 text-[#d29922]" />
                <h3 className="text-white font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.about.skills_title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((group, i) => (
                  <div key={i}>
                    <p className="text-[#8b949e] text-xs font-semibold uppercase tracking-widest mb-2">
                      {group.group}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill, j) => (
                        <span
                          key={j}
                          className="text-xs bg-[#21262d] text-[#c9d1d9] border border-[#30363d] px-2 py-0.5 rounded-md hover:border-[#58a6ff]/30 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
