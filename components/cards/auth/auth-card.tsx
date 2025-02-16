'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfForm from '@/components/forms/conf-form';
import AuthForm from '@/components/forms/auth-form';
import AuthCardHeader from '@/components/cards/auth/auth-card-header';

export default function AuthCard() {
    const [isLogin, setIsLogin] = useState(true);
    const [stage, setStage] = useState<"initial" | "verification">("initial");

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 w-[400px]">
            <div className="w-full space-y-4">
                <AuthCardHeader stage={stage} isLogin={isLogin} setIsLogin={setIsLogin} />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${isLogin ? "login" : "register"}-${stage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {stage === "initial" ? (
                            <AuthForm setStage={setStage} isLogin={isLogin} />
                        ) : (
                           <ConfForm />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

