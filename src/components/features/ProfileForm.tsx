"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { User, Settings, Save, X } from "lucide-react";

export default function ProfileForm({ 
  user 
}: { 
  user: any 
}) {
  const [state, formAction, isPending] = useActionState(updateProfile, undefined);
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
          <button 
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-xl bg-color-primary-50 text-color-primary-600 font-medium hover:bg-color-primary-100 transition-colors"
          >
              Edit Profile
          </button>
          <button className="p-2 rounded-xl border border-border-glass text-foreground/60 hover:text-foreground hover:bg-background transition-colors">
              <Settings className="w-5 h-5" />
          </button>
      </div>
    );
  }

  return (
    <div className="mt-6 glass rounded-2xl p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-lg text-foreground">Edit Settings</h3>
        <button onClick={() => setIsEditing(false)} className="text-foreground/50 hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form action={formAction} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={user.name || ""} 
            className="w-full bg-background border border-border-glass rounded-xl px-4 py-2 focus:ring-2 focus:ring-color-primary-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Native Language</label>
          <select 
            name="nativeLanguage" 
            defaultValue={user.profile?.nativeLanguage || "es"}
            className="w-full bg-background border border-border-glass rounded-xl px-4 py-2 focus:ring-2 focus:ring-color-primary-500 outline-none"
          >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ar">Arabic</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Learning Goal</label>
          <select 
            name="learningGoal" 
            defaultValue={user.profile?.learningGoal || "General Fluency"}
            className="w-full bg-background border border-border-glass rounded-xl px-4 py-2 focus:ring-2 focus:ring-color-primary-500 outline-none"
          >
            <option value="General Fluency">General Fluency</option>
            <option value="Business English">Business English</option>
            <option value="Travel & Leisure">Travel & Leisure</option>
            <option value="Exam Preparation (IELTS/TOEFL)">Exam Preparation (IELTS/TOEFL)</option>
            <option value="Academic Study">Academic Study</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Daily Study Goal (Minutes)</label>
          <input 
            type="number" 
            name="dailyGoal" 
            defaultValue={user.profile?.dailyGoal?.toString() || "15"} 
            min="5" max="120" step="5"
            className="w-full bg-background border border-border-glass rounded-xl px-4 py-2 focus:ring-2 focus:ring-color-primary-500 outline-none"
          />
        </div>

        {state?.error && <p className="text-color-danger-500 text-sm">{state.error}</p>}
        {state?.success && <p className="text-color-success-500 text-sm">Profile updated successfully!</p>}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-color-primary-600 hover:bg-color-primary-500 text-white rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
