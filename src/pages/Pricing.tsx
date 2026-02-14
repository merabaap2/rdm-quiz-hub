import { useState } from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { useUserStore } from '@/store/useUserStore';
import { pricingPlans } from '@/data/pricing';
import { Button } from '@/components/ui/button';
import { Check, Crown, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const premiumFeatures = [
  { name: 'Past Papers', desc: 'Access past exam papers', icon: '📄' },
  { name: 'Mock Tests', desc: 'Full-length timed tests', icon: '📝' },
  { name: 'Adaptive Tests', desc: 'Difficulty adjusts to you', icon: '🎯' },
  { name: 'FITRICE Framework', desc: 'Structured learning path', icon: '🧠' },
];

const Pricing = () => {
  const topUpRdm = useUserStore((s) => s.topUpRdm);
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const [purchased, setPurchased] = useState<string | null>(null);

  const handlePurchase = (planId: string, rdmAmount: number) => {
    topUpRdm(rdmAmount);
    setPurchased(planId);
    import('canvas-confetti').then((confetti) => {
      confetti.default({ particleCount: 100, spread: 70 });
    });
    setTimeout(() => setPurchased(null), 3000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display text-foreground mb-2 flex items-center gap-2">
          <Crown className="w-7 h-7 text-edu-yellow" /> Plans & Top-up
        </h2>
        <p className="text-muted-foreground mb-6">Top up RDM and unlock premium features</p>

        {/* Current balance */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6 flex items-center justify-between">
          <span className="text-muted-foreground">Current Balance</span>
          <span className="font-bold text-2xl text-foreground">{user?.rdm ?? 0} RDM</span>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-card rounded-2xl p-5 border-2 transition-all ${
                plan.recommended ? 'border-primary shadow-lg' : 'border-border'
              }`}
            >
              {plan.recommended && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 mb-3">
                  <Sparkles className="w-3 h-3" /> RECOMMENDED
                </span>
              )}
              <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
              <p className="text-xl font-bold text-primary mb-3">{plan.price}</p>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {plan.id !== 'free' && (
                <Button
                  onClick={() => handlePurchase(plan.id, plan.rdmAmount)}
                  disabled={purchased === plan.id}
                  className="w-full rounded-xl font-bold gradient-primary text-primary-foreground border-0"
                >
                  {purchased === plan.id ? '✅ Done!' : `Get ${plan.rdmAmount} RDM`}
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Premium Features Preview */}
        <h3 className="font-bold text-foreground text-lg mb-4">Premium Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {premiumFeatures.map((f) => (
            <div
              key={f.name}
              className="bg-card rounded-2xl p-5 border border-border relative overflow-hidden"
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <h4 className="font-bold text-sm text-foreground">{f.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Premium
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Pricing;
