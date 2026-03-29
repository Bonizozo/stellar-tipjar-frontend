"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  Layout, 
  Layers, 
  ChevronRight, 
  CloudRain, 
  Heart, 
  Star, 
  MessageCircle, 
  ShieldCheck 
} from "lucide-react";

import { Avatar } from "@/components/Avatar";
import { AvatarGroup } from "@/components/Avatar/AvatarGroup";
import { Divider } from "@/components/Divider";
import { ProgressBar } from "@/components/Progress/ProgressBar";
import { CircularProgress } from "@/components/Progress/CircularProgress";
import { StepProgress } from "@/components/Progress/StepProgress";
import { UploadProgress } from "@/components/Progress/UploadProgress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/Accordion";
import { Tabs } from "@/components/Tabs";

export default function DesignSystemPage() {
  const [progress, setProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(45);
  const [activeStep, setActiveStep] = useState(1);

  // Mock progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((v) => (v >= 100 ? 0 : v + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, label: "Profile", description: "Your basic info" },
    { id: 2, label: "Identity", description: "Verification docs" },
    { id: 3, label: "Review", description: "Final check" },
    { id: 4, label: "Success", description: "Ready to go" },
  ];

  return (
    <div className="min-h-screen bg-canvas dark:bg-ink p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-16"
      >
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-ink dark:text-canvas tracking-tight">
            Design <span className="text-wave">System</span> Showcase
          </h1>
          <p className="text-lg text-ink/60 dark:text-canvas/60 max-w-2xl">
            A comprehensive look at our redesigned components, built for performance, 
            accessibility, and visual excellence.
          </p>
        </header>

        {/* Avatar Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 text-ink/40 dark:text-canvas/40 uppercase tracking-widest text-xs font-bold">
            <User className="h-4 w-4" />
            <span>Avatars & Identities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-ink/5 dark:border-canvas/5">
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Multiple Sizes</h3>
              <div className="flex flex-wrap items-end gap-6">
                <Avatar name="XS" size="xs" status="online" />
                <Avatar name="SM" size="sm" status="away" />
                <Avatar name="MD" size="md" status="busy" />
                <Avatar name="LG" size="lg" status="offline" />
                <Avatar name="XL" size="xl" isVerified />
                <Avatar name="2XL" size="2xl" isVerified />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-lg">Avatar Groups</h3>
              <div className="space-y-8">
                <AvatarGroup size="md" max={3}>
                  <Avatar name="Alice" />
                  <Avatar name="Bob" />
                  <Avatar name="Charlie" />
                  <Avatar name="Diana" />
                  <Avatar name="Eve" />
                </AvatarGroup>
                
                <AvatarGroup size="xl" max={4} total={12}>
                  <Avatar name="User One" />
                  <Avatar name="User Two" />
                  <Avatar name="User Three" />
                  <Avatar name="User Four" />
                </AvatarGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Divider Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 text-ink/40 dark:text-canvas/40 uppercase tracking-widest text-xs font-bold">
            <Layout className="h-4 w-4" />
            <span>Dividers & Separators</span>
          </div>

          <div className="space-y-6 bg-white/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-ink/5 dark:border-canvas/5">
            <div className="space-y-4">
              <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">Default & Text</p>
              <Divider />
              <Divider text="OR CONTINUE WITH" />
              <Divider icon={<Star className="h-4 w-4 text-sunrise" />} text="DECORATIVE" />
            </div>

            <div className="space-y-4">
                <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">Gradient & Dashed</p>
                <Divider variant="gradient" />
                <Divider variant="dashed" thickness={2} />
            </div>

            <div className="space-y-4">
                <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">Ornaments</p>
                <Divider ornament />
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 text-ink/40 dark:text-canvas/40 uppercase tracking-widest text-xs font-bold">
            <Layers className="h-4 w-4" />
            <span>Progress & Loaders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-ink/5 dark:border-canvas/5">
            <div className="space-y-10">
              <div className="space-y-6">
                <ProgressBar progress={progress} label="System Sync" showPercentage color="wave" />
                <ProgressBar progress={75} label="Storage" color="sunrise" size="sm" />
                <ProgressBar indeterminate label="Establishing Connection" color="moss" />
              </div>
              
              <div className="flex items-center gap-12">
                 <CircularProgress progress={progress} showPercentage color="text-wave" />
                 <CircularProgress progress={85} size={84} thickness={8} showPercentage color="text-sunrise" />
                 <CircularProgress progress={45} size={48} thickness={6} color="text-moss" />
              </div>
            </div>

            <div className="space-y-10">
               <h3 className="font-bold text-lg">File Uploads</h3>
               <div className="space-y-4">
                  <UploadProgress 
                    fileName="contracts_v2.pdf" 
                    fileSize="1.4 MB" 
                    progress={uploadProgress} 
                    onCancel={() => setUploadProgress(0)}
                  />
                  <UploadProgress 
                    fileName="profile_picture.jpg" 
                    fileSize="840 KB" 
                    progress={100} 
                    status="completed" 
                  />
                  <UploadProgress 
                    fileName="error_log.txt" 
                    fileSize="45 KB" 
                    progress={32} 
                    status="error" 
                    onRetry={() => setUploadProgress(45)}
                  />
               </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-ink/5 dark:border-canvas/5">
             <h3 className="font-bold text-lg mb-12 text-center">Step Indicators</h3>
             <StepProgress 
                steps={steps} 
                currentStep={activeStep} 
                onStepClick={setActiveStep} 
             />
          </div>
        </section>

        {/* Accordion Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 text-ink/40 dark:text-canvas/40 uppercase tracking-widest text-xs font-bold">
            <MessageCircle className="h-4 w-4" />
            <span>Accordions</span>
          </div>

          <div className="bg-white/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-ink/5 dark:border-canvas/5">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger icon={<CloudRain className="h-4 w-4" />}>
                  What is the Stellar Tip Jar?
                </AccordionTrigger>
                <AccordionContent>
                  The Stellar Tip Jar is a decentralized platform that allows creators to receive tips 
                  and donations in XLM and other Stellar-based assets with zero platform fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger icon={<ShieldCheck className="h-4 w-4" />}>
                  Is it secure?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. We use the Stellar network's native security features and never store your 
                  private keys. All transactions happen directly between you and your supporters.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" disabled>
                <AccordionTrigger icon={<Settings className="h-4 w-4" />}>
                  Advanced Configuration (Locked)
                </AccordionTrigger>
                <AccordionContent>
                   This item is disabled.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Tabs */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-ink dark:text-canvas">Tabs</h2>

          <div className="space-y-10">
            {/* Underline */}
            <div>
              <p className="text-sm text-ink/50 dark:text-canvas/50 mb-4">Underline (default)</p>
              <Tabs
                tabs={[
                  { id: "profile", label: "Profile", icon: <User className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">Your public profile details and bio.</p> },
                  { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" />, badge: 3, content: <p className="text-ink/70 dark:text-canvas/70">Manage your account settings.</p> },
                  { id: "activity", label: "Activity", content: <p className="text-ink/70 dark:text-canvas/70">Recent tips and interactions.</p> },
                  { id: "locked", label: "Locked", disabled: true, content: null },
                ]}
              />
            </div>

            {/* Pills */}
            <div>
              <p className="text-sm text-ink/50 dark:text-canvas/50 mb-4">Pills</p>
              <Tabs
                style="pills"
                tabs={[
                  { id: "all", label: "All", badge: 12, content: <p className="text-ink/70 dark:text-canvas/70">All creators on the platform.</p> },
                  { id: "trending", label: "Trending", icon: <Star className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">Trending creators this week.</p> },
                  { id: "new", label: "New", content: <p className="text-ink/70 dark:text-canvas/70">Recently joined creators.</p> },
                ]}
              />
            </div>

            {/* Enclosed */}
            <div>
              <p className="text-sm text-ink/50 dark:text-canvas/50 mb-4">Enclosed</p>
              <Tabs
                style="enclosed"
                tabs={[
                  { id: "overview", label: "Overview", icon: <Layout className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">High-level overview of your stats.</p> },
                  { id: "details", label: "Details", icon: <Layers className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">Detailed breakdown of transactions.</p> },
                ]}
              />
            </div>

            {/* Vertical */}
            <div>
              <p className="text-sm text-ink/50 dark:text-canvas/50 mb-4">Vertical</p>
              <Tabs
                orientation="vertical"
                tabs={[
                  { id: "v-profile", label: "Profile", icon: <User className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">Your public profile details.</p> },
                  { id: "v-settings", label: "Settings", icon: <Settings className="h-4 w-4" />, content: <p className="text-ink/70 dark:text-canvas/70">Account settings and preferences.</p> },
                  { id: "v-messages", label: "Messages", icon: <MessageCircle className="h-4 w-4" />, badge: 5, content: <p className="text-ink/70 dark:text-canvas/70">Your messages and notifications.</p> },
                ]}
              />
            </div>
          </div>
        </section>

        <footer className="pt-16 pb-8 text-center border-t border-ink/5 dark:border-canvas/5 text-ink/40 dark:text-canvas/40 text-sm">
           <p>© 2026 Stellar Tip Jar Design Lab. Built with Passion.</p>
        </footer>
      </motion.div>
    </div>
  );
}
