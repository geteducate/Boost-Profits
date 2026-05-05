import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getPaddleEnvironment } from "@/lib/paddle";
import { useSession } from "@/hooks/useSession";

export type Subscription = {
  id: string;
  paddle_subscription_id: string;
  paddle_customer_id: string;
  product_id: string;
  price_id: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  environment: string;
};

export function useSubscription() {
  const { session, loading: sessionLoading } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSub = async (userId: string) => {
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("environment", getPaddleEnvironment())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSubscription((data as Subscription) || null);
    setLoading(false);
  };

  useEffect(() => {
    if (sessionLoading) return;
    if (!session) { setSubscription(null); setLoading(false); return; }
    fetchSub(session.user.id);

    const channel = supabase
      .channel(`subs-${session.user.id}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "subscriptions",
        filter: `user_id=eq.${session.user.id}`,
      }, () => fetchSub(session.user.id))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [session, sessionLoading]);

  const now = Date.now();
  const periodActive = !subscription?.current_period_end || new Date(subscription.current_period_end).getTime() > now;
  const isActive = !!subscription && (
    (["active", "trialing", "past_due"].includes(subscription.status) && periodActive) ||
    (subscription.status === "canceled" && periodActive)
  );

  const tier = subscription?.product_id === "starter_plan" ? "starter"
    : subscription?.product_id === "pro_plan" ? "pro"
    : subscription?.product_id === "business_plan" ? "business"
    : null;

  return { subscription, isActive, tier, loading: loading || sessionLoading };
}
