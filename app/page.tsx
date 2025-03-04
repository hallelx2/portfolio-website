"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Award, Brain, Code, Database, Server, ChevronDown, Send, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChatInterface } from '@/components/chat-interface';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

interface SkillProgressProps {
  skill: string;
  value: number;
}

const SkillProgress = ({ skill, value }: SkillProgressProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Progress
        value={inView ? value : 0}
        className="h-2"
        style={{
          transition: "value 1s ease-out",
        }}
      />
    </div>
  );
};

interface Project {
  title: string;
  description: string;
  badges: string[];
  details: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={{
        rotateY: isHovered ? 10 : 0,
        rotateX: isHovered ? -10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6 relative">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.badges.map((badge, index) => (
                <Badge key={index} className="mb-2">{badge}</Badge>
              ))}
            </div>
          </motion.div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/5 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center p-4">
                <p className="text-sm">{project.details}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface Skill {
  name: string;
  level: number;
  description: string;
  technologies: string[];
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillCategoryProps extends SkillCategory {}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress
                  value={inView ? skill.level : 0}
                  className="h-2"
                  style={{
                    transition: "value 1s ease-out",
                  }}
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{skill.name}</h4>
                <p className="text-sm">{skill.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </Card>
  );
};

const Footer = () => (
  <footer className="bg-background border-t border-border mt-16">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">HDO</h3>
          <p className="text-sm text-muted-foreground">
            Building innovative solutions in AI, blockchain, and full-stack development.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#skills" className="text-sm hover:text-primary transition-colors">Skills</a></li>
            <li><a href="#projects" className="text-sm hover:text-primary transition-colors">Projects</a></li>
            <li><a href="#achievements" className="text-sm hover:text-primary transition-colors">Achievements</a></li>
            <li><a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a title="Github" href="https://github.com/hallelx2" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a title="Gmail" href="mailto:halleluyaholudele@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a title="LinkedIn" href="#" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Chat with AI Assistant</h3>
          <p className="text-sm text-muted-foreground mb-4">Coming soon! Chat with my AI assistant to learn more about my work.</p>
          <Button variant="outline" disabled className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat Coming Soon
          </Button>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Halleluyah Darasimi Oludele. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [showBio, setShowBio] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mailtoLink = `mailto:halleluyaholudele@gmail.com?subject=${encodeURIComponent(`Contact from ${formData.name}`)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bioContent = `As a versatile software engineer with a passion for innovation, I've made significant strides in AI, blockchain, and full-stack development. My journey is marked by multiple hackathon victories and the creation of impactful solutions across various domains. From developing emotion detection systems to building secure blockchain voting platforms, I combine technical expertise with creative problem-solving to deliver cutting-edge solutions. As the founder of Oncolens, I'm working to revolutionize global pathology collaboration through technology. My diverse skill set spans backend technologies like Django and FastAPI to frontend frameworks like Next.js and React, complemented by extensive experience with AI tools including Cohere AI and Gemini AI.`;

  const projects = [
    {
      title: "Synthesis AI",
      description: "Academic paper retrieval and knowledge graph generation using Dgraph and Gemini API.",
      badges: ["Golang", "Next.js", "Gemini API"],
      details: "Built a sophisticated system for academic research that uses AI to analyze papers and generate knowledge graphs, making research more accessible and connected."
    },
    {
      title: "Legal AI",
      description: "AI-powered legal agreement generation with DocuSign integration.",
      badges: ["NestJS", "Gemini LLM", "DocuSign API"],
      details: "Automated legal document generation using AI, with seamless integration for digital signatures. Significantly reduced document preparation time."
    },
    {
      title: "HealthPulse",
      description: "AI-powered healthcare analytics platform using MindsDB and Upstage LLMs.",
      badges: ["Express.js", "MindsDB", "Upstage LLMs"],
      details: "Created an innovative healthcare platform that uses AI to analyze health data and provide personalized insights for better health management."
    },
    {
      title: "Blockchain Voting Platform",
      description: "Award-winning secure and transparent voting system using blockchain technology.",
      badges: ["Blockchain", "Smart Contracts", "Web3"],
      details: "Award-winning platform that revolutionizes voting systems with blockchain technology, ensuring transparency and security in electoral processes."
    }
  ];

  const skillCategories = [
    {
      title: "Backend Development",
      skills: [
        {
          name: "Django & FastAPI",
          level: 95,
          description: "Expert in building scalable Python web applications and RESTful APIs",
          technologies: ["Django", "FastAPI", "Django REST", "Pydantic", "SQLAlchemy"]
        },
        {
          name: "Node.js Ecosystem",
          level: 90,
          description: "Proficient in building server-side applications with Node.js frameworks",
          technologies: ["NestJS", "Express", "Convex", "TypeScript"]
        }
      ]
    },
    {
      title: "Frontend Development",
      skills: [
        {
          name: "React & Next.js",
          level: 92,
          description: "Advanced expertise in building modern web applications",
          technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
        },
        {
          name: "UI/UX Implementation",
          level: 88,
          description: "Creating responsive and accessible user interfaces",
          technologies: ["Framer Motion", "Radix UI", "Shadcn/UI"]
        }
      ]
    },
    {
      title: "AI & Machine Learning",
      skills: [
        {
          name: "LLM Integration",
          level: 85,
          description: "Implementing AI solutions using various language models",
          technologies: ["Cohere AI", "Gemini AI", "MindsDB", "Upstage LLMs"]
        },
        {
          name: "AI Application Development",
          level: 82,
          description: "Building practical AI-powered applications",
          technologies: ["Streamlit", "Langchain", "Hugging Face"]
        }
      ]
    },
    {
      title: "Blockchain & Web3",
      skills: [
        {
          name: "Smart Contract Development",
          level: 88,
          description: "Creating and deploying secure smart contracts",
          technologies: ["Solidity", "Web3.js", "Ethers.js"]
        },
        {
          name: "DApp Development",
          level: 85,
          description: "Building decentralized applications",
          technologies: ["Hardhat", "IPFS", "Partisia"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.span
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            HDO
          </motion.span>
          <div className="flex gap-6">
            <motion.a
              href="#skills"
              className="hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Skills
            </motion.a>
            <motion.a
              href="#projects"
              className="hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Projects
            </motion.a>
            <motion.a
              href="#achievements"
              className="hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Achievements
            </motion.a>
            <motion.a
              href="#contact"
              className="hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>
        </nav>
      </motion.header>

      <main className="relative">
        <div ref={containerRef} className="h-screen relative overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ y, opacity }}
          >
            <div className="container mx-auto px-4 text-center relative">
              <FloatingElement delay={0}>
                <motion.h1
                  className="text-6xl font-bold mb-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Halleluyah Darasimi Oludele
                </motion.h1>
              </FloatingElement>

              <FloatingElement delay={0.2}>
                <h2 className="text-2xl text-muted-foreground mb-6">Software Engineer</h2>
              </FloatingElement>

              <FloatingElement delay={0.4}>
                <div className="flex justify-center gap-4 mb-8">
                  <motion.a
                    href="https://github.com/hallelx2"
                    className="hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="mailto:halleluyaholudele@gmail.com"
                    className="hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>
              </FloatingElement>

              <FloatingElement delay={0.6}>
                <motion.button
                  onClick={() => setShowBio(!showBio)}
                  className="flex items-center gap-2 mx-auto text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Read Bio <ChevronDown className={`w-4 h-4 transition-transform ${showBio ? 'rotate-180' : ''}`} />
                </motion.button>
              </FloatingElement>

              <AnimatePresence>
                {showBio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-left max-w-3xl mx-auto"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {bioContent}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.section
            id="skills"
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <SkillCategory key={index} {...category} />
              ))}
            </div>
          </motion.section>

          <Separator className="my-16" />

          <motion.section
            id="projects"
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Notable Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </motion.section>

          <motion.section
            id="achievements"
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Cohere AI Hack4Good 2023",
                  description: "Honorable Mention Award for developing an emotion detection app",
                  badge: "AI",
                  details: "Created an innovative emotion detection system using Cohere's AI technology to analyze social media posts for mental health monitoring."
                },
                {
                  title: "NDPC Code for Privacy Hackathon 2024",
                  description: "First place for blockchain-based voting platform",
                  badge: "Blockchain",
                  details: "Developed a secure and transparent voting system using blockchain technology, ensuring privacy and integrity of the voting process."
                },
                {
                  title: "Partisia Blockchain Hackathon 2024",
                  description: "Most Valuable Participant award",
                  badge: "MVP",
                  details: "Recognized for outstanding contributions and innovative solutions in blockchain technology development."
                },
                {
                  title: "Hult Prize UCH 2024",
                  description: "Winner for Oncolens startup",
                  badge: "Startup",
                  details: "Founded Oncolens, a revolutionary platform connecting pathologists globally through smartphone technology."
                }
              ].map((achievement, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <Award className="w-6 h-6 mb-2 text-primary" />
                          <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                          <p className="text-muted-foreground mb-4">{achievement.description}</p>
                          <Badge>{achievement.badge}</Badge>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Achievement Details</h4>
                      <p className="text-sm">{achievement.details}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Let's Connect</h2>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
      <ChatInterface />
    </div>
  );
}
