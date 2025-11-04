import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  referral_code: string | null;
  bank_details: {
    account_name?: string;
    account_number?: string;
    bank_name?: string;
    routing_number?: string;
  } | null;
  contact_info: {
    phone?: string;
    address?: string;
    website?: string;
  } | null;
}

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  
  const [profile, setProfile] = useState<Profile>({
    id: "",
    full_name: "",
    email: "",
    referral_code: "",
    bank_details: {
      account_name: "",
      account_number: "",
      bank_name: "",
      routing_number: "",
    },
    contact_info: {
      phone: "",
      address: "",
      website: "",
    },
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchReferralCount();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          id: data.id,
          full_name: data.full_name,
          email: data.email,
          referral_code: data.referral_code,
          bank_details: (data.bank_details as any) || {
            account_name: "",
            account_number: "",
            bank_name: "",
            routing_number: "",
          },
          contact_info: (data.contact_info as any) || {
            phone: "",
            address: "",
            website: "",
          },
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReferralCount = async () => {
    try {
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("referred_by", user?.id);
      
      setReferralCount(count || 0);
    } catch (error: any) {
      console.error("Error fetching referral count:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          bank_details: profile.bank_details,
          contact_info: profile.contact_info,
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth?ref=${profile.referral_code}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and payment information</p>
        </div>

        {/* Referral Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Referral Program
            </CardTitle>
            <CardDescription>Share your referral code and earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Your Referral Code</Label>
              <div className="flex gap-2 mt-2">
                <Input value={profile.referral_code || ""} readOnly />
                <Button onClick={copyReferralLink} variant="outline">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                {referralCount} Referral{referralCount !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email || ""} disabled />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Let buyers know how to reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.contact_info?.phone || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contact_info: { ...profile.contact_info, phone: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profile.contact_info?.address || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contact_info: { ...profile.contact_info, address: e.target.value },
                  })
                }
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={profile.contact_info?.website || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    contact_info: { ...profile.contact_info, website: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
            <CardDescription>Add your bank information for payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="account_name">Account Name</Label>
              <Input
                id="account_name"
                value={profile.bank_details?.account_name || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bank_details: { ...profile.bank_details, account_name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                id="account_number"
                value={profile.bank_details?.account_number || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bank_details: { ...profile.bank_details, account_number: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input
                id="bank_name"
                value={profile.bank_details?.bank_name || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bank_details: { ...profile.bank_details, bank_name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="routing_number">Routing Number</Label>
              <Input
                id="routing_number"
                value={profile.bank_details?.routing_number || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bank_details: { ...profile.bank_details, routing_number: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;