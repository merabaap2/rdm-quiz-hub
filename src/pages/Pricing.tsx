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
      <div className="p-4 pb-8">
        <h2 className="text-2xl font-display text-foreground mb-1 flex items-center gap-2">
          <Crown className="w-6 h-6 text-edu-yellow" /> Plans
        </h2>
        <p className="text-muted-foreground text-sm mb-4">Top up RDM and unlock features</p>

        {/* Current balance */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Balance</span>
          <span className="font-bold text-lg text-foreground">{user?.rdm ?? 0} RDM</span>
        </div>

        {/* Plans */}
        <div className="space-y-3 mb-6">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.01 }}
              className={`bg-card rounded-2xl p-4 border-2 transition-all ${
                plan.recommended ? 'border-primary shadow-lg' : 'border-border'
              }`}
            >
              {plan.recommended && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-2">
                  <Sparkles className="w-3 h-3" /> RECOMMENDED
                </span>
              )}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-foreground">{plan.name}</h3>
                  <p className="text-lg font-bold text-primary">{plan.price}</p>
                </div>
                {plan.id !== 'free' && (
                  <Button
                    size="sm"
                    onClick={() => handlePurchase(plan.id, plan.rdmAmount)}
                    disabled={purchased === plan.id}
                    className="rounded-full font-bold gradient-primary text-primary-foreground border-0"
                  >
                    {purchased === plan.id ? '✅ Done!' : `Get ${plan.rdmAmount} RDM`}
                  </Button>
                )}
              </div>
              <ul className="space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Premium Features Preview */}
        <h3 className="font-bold text-foreground text-sm mb-3">Premium Features</h3>
        <div className="grid grid-cols-2 gap-2">
          {premiumFeatures.map((f) => (
            <div
              key={f.name}
              className="bg-card rounded-2xl p-4 border border-border relative overflow-hidden"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <h4 className="font-bold text-sm text-foreground">{f.name}</h4>
              <p className="text-[10px] text-muted-foreground">{f.desc}</p>
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
