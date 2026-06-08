"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface VerifyButtonProps {
    operatorId: string;
}

export default function VerifyButton({ operatorId }: VerifyButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAction = async (action: "APPROVE" | "REJECT") => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/verify-operator", {
                method: "POST",
                body: JSON.stringify({ operatorId, action }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                disabled={loading}
                onClick={() => handleAction("APPROVE")}
                className="bg-green-500 hover:bg-green-600 h-8 px-3 rounded-lg flex gap-1"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                Approve
            </Button>
            <button
                disabled={loading}
                onClick={() => handleAction("REJECT")}
                className="text-gray-500 hover:text-red-400 p-1"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
