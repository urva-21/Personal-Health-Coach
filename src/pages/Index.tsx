import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Heart, Sparkles, Apple, Dumbbell, Moon, Brain, Zap } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm your Personal Health Coach. I'm here to help you on your wellness journey. Whether you want to improve your nutrition, build better exercise habits, sleep better, or manage stress, I'm here to support you.\n\nHow can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Health profile state
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [sleep, setSleep] = useState("7");
  const [activityLevel, setActivityLevel] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Weight loss queries
    if (input.includes("weight loss") || input.includes("lose weight") || input.includes("fat loss")) {
      return "🎯 **Weight Loss Tips:**\n\n1. **Caloric Deficit**: Consume fewer calories than you burn (aim for 300-500 calorie deficit)\n2. **Protein Intake**: Eat 1.6-2.2g protein per kg body weight to preserve muscle\n3. **Strength Training**: 3-4 times per week to maintain metabolism\n4. **Cardio**: 150-300 minutes of moderate activity weekly\n5. **Sleep**: Get 7-9 hours - poor sleep increases hunger hormones\n6. **Hydration**: Drink 3-4 liters of water daily\n7. **Avoid**: Processed foods, sugary drinks, excessive snacking\n\n💡 **Pro Tip**: Sustainable weight loss is 0.5-1kg per week. Focus on building healthy habits rather than quick fixes!";
    }

    // Muscle gain queries
    if (input.includes("muscle") || input.includes("gain weight") || input.includes("bulk")) {
      return "💪 **Muscle Building Guide:**\n\n1. **Caloric Surplus**: Eat 300-500 calories above maintenance\n2. **Protein**: 1.6-2.2g per kg body weight daily\n3. **Progressive Overload**: Gradually increase weight/reps\n4. **Workout Split**: Train each muscle group 2x per week\n5. **Compound Exercises**: Focus on squats, deadlifts, bench press, rows\n6. **Recovery**: 48-72 hours rest between training same muscle group\n7. **Carbs**: Eat complex carbs (rice, oats, potatoes) for energy\n\n🍗 **Sample Meal Plan**: 4-6 meals daily with protein source in each (chicken, eggs, fish, legumes)\n\n⏰ **Patience**: Expect 0.25-0.5kg muscle gain per month for natural lifters.";
    }

    // Workout plans
    if (input.includes("workout") || input.includes("exercise") || input.includes("routine") || input.includes("gym")) {
      return "🏋️ **Workout Plan Options:**\n\n**For Beginners (3 days/week):**\n• Monday: Full Body (Squats, Push-ups, Rows, Planks)\n• Wednesday: Full Body (Lunges, Overhead Press, Pull-ups, Crunches)\n• Friday: Full Body (Deadlifts, Bench Press, Lat Pulldowns, Leg Raises)\n\n**Intermediate (4 days/week):**\n• Day 1: Upper Body Push\n• Day 2: Lower Body\n• Day 3: Rest\n• Day 4: Upper Body Pull\n• Day 5: Lower Body\n\n**Each Session:**\n• Warm-up: 5-10 minutes\n• Main workout: 45-60 minutes\n• Cool down: 5-10 minutes stretching\n\n📝 Start with 3 sets of 8-12 reps for each exercise!";
    }

    // Diet and nutrition
    if (input.includes("diet") || input.includes("nutrition") || input.includes("meal") || input.includes("food") || input.includes("eat")) {
      return "🥗 **Healthy Nutrition Guide:**\n\n**Daily Macros:**\n• Protein: 25-35% of calories (lean meats, eggs, fish, legumes)\n• Carbs: 45-55% (whole grains, fruits, vegetables)\n• Fats: 20-30% (nuts, avocado, olive oil, fatty fish)\n\n**Meal Structure:**\n\n🍳 **Breakfast**: Oats with protein powder, eggs with vegetables\n🥙 **Lunch**: Grilled chicken/fish with brown rice and salad\n🍎 **Snacks**: Greek yogurt, nuts, fruits\n🍽️ **Dinner**: Lean protein with quinoa/sweet potato and veggies\n\n**Foods to Prioritize:**\n✅ Leafy greens, berries, lean proteins, whole grains, healthy fats\n❌ Processed foods, sugary drinks, trans fats, excessive alcohol\n\n💧 **Hydration**: Drink 3-4 liters of water daily!";
    }

    // Stress and mental health
    if (input.includes("stress") || input.includes("anxiety") || input.includes("mental") || input.includes("depression")) {
      return "🧘 **Mental Health & Stress Management:**\n\n**Immediate Relief:**\n• Deep breathing: 4-7-8 technique (inhale 4s, hold 7s, exhale 8s)\n• Take a walk outside for 10-15 minutes\n• Practice progressive muscle relaxation\n\n**Daily Habits:**\n1. **Exercise**: 30 min daily - releases endorphins\n2. **Sleep**: 7-9 hours - crucial for mental health\n3. **Meditation**: 10-20 minutes mindfulness practice\n4. **Social Connection**: Talk to friends/family regularly\n5. **Limit Screen Time**: Especially before bed\n6. **Journaling**: Write down thoughts and feelings\n\n**Natural Stress Reducers:**\n• Omega-3 fatty acids (fish, walnuts)\n• Magnesium-rich foods (spinach, almonds)\n• Green tea (contains L-theanine)\n• Regular sunlight exposure\n\n⚠️ If symptoms persist, please consult a mental health professional.";
    }

    // Sleep problems
    if (input.includes("sleep") || input.includes("insomnia") || input.includes("tired")) {
      return "😴 **Better Sleep Guide:**\n\n**Sleep Hygiene Rules:**\n1. **Consistent Schedule**: Same bedtime & wake time daily\n2. **Dark Room**: Use blackout curtains, remove electronics\n3. **Cool Temperature**: 60-67°F (15-19°C) is optimal\n4. **No Screens**: Avoid blue light 1-2 hours before bed\n5. **No Caffeine**: After 2 PM\n6. **Light Dinner**: Eat 2-3 hours before bed\n\n**Bedtime Routine:**\n• 9:00 PM - Dim lights, stop work\n• 9:30 PM - Warm shower/bath\n• 10:00 PM - Read or light stretching\n• 10:30 PM - Sleep time\n\n**Natural Sleep Aids:**\n• Magnesium supplement (400mg)\n• Chamomile tea\n• Lavender essential oil\n• 4-7-8 breathing technique\n\n🎯 **Goal**: 7-9 hours of quality sleep per night!";
    }

    // Injury or pain
    if (input.includes("pain") || input.includes("injury") || input.includes("hurt") || input.includes("sore")) {
      return "🏥 **Injury Prevention & Recovery:**\n\n**For Muscle Soreness (DOMS):**\n• Light activity/walking to increase blood flow\n• Foam rolling and stretching\n• Adequate protein intake (helps repair)\n• Stay hydrated\n• Get enough sleep\n\n**For Acute Injury (RICE Protocol):**\n• **R**est: Stop the activity\n• **I**ce: Apply for 15-20 min every 2-3 hours\n• **C**ompression: Use bandage to reduce swelling\n• **E**levation: Keep injured area raised\n\n**Prevention Tips:**\n1. Always warm up before exercise (5-10 min)\n2. Use proper form - quality over quantity\n3. Progress gradually - don't increase intensity too fast\n4. Include rest days in your routine\n5. Listen to your body\n\n⚠️ **Red Flags**: If you have severe pain, swelling, or limited mobility, please see a doctor immediately!";
    }

    // Default response for general queries
    return "I'm here to help with your health and fitness questions! 🌟\n\nI can provide advice on:\n\n✅ **Fitness**: Workout routines, exercise techniques\n✅ **Nutrition**: Diet plans, meal prep, macros\n✅ **Weight Management**: Loss, gain, or maintenance\n✅ **Recovery**: Sleep, injury prevention\n✅ **Wellness**: Stress management, mental health\n\nPlease ask me a specific question, and I'll provide detailed advice!\n\nExamples:\n• \"How can I lose weight?\"\n• \"What's a good workout routine?\"\n• \"Tips for better sleep?\"";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(input),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const quickActions = [
    { icon: Apple, text: "Healthy eating tips", gradient: "from-green-400 to-emerald-500" },
    { icon: Dumbbell, text: "Exercise routine", gradient: "from-blue-400 to-cyan-500" },
    { icon: Moon, text: "Better sleep", gradient: "from-indigo-400 to-purple-500" },
    { icon: Brain, text: "Stress management", gradient: "from-pink-400 to-rose-500" },
    { icon: Zap, text: "Boost energy", gradient: "from-yellow-400 to-orange-500" },
  ];

  const healthGoals = [
    "Lose weight", "Build muscle", "Improve sleep", 
    "Reduce stress", "Eat healthier", "Increase energy", "Improve fitness"
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Personal Health Coach
                <Sparkles className="w-4 h-4 text-purple-500" />
              </h1>
              <p className="text-sm text-gray-500">Your AI wellness companion</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-hidden px-6 py-6">
          <ScrollArea className="h-full">
            <div className="space-y-6 max-w-4xl">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  {!message.isUser && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                      message.isUser
                        ? "bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 border border-purple-100"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Quick Actions Bar */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-wrap gap-2 mb-4 max-w-4xl">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => {
                  setInput(action.text);
                  inputRef.current?.focus();
                }}
                className="flex items-center gap-2 text-sm border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all"
              >
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${action.gradient}`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                {action.text}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-3 max-w-4xl">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about nutrition, exercise, sleep, or wellness..."
              className="flex-1 rounded-xl border-gray-300 focus:border-cyan-400 focus:ring-cyan-400 bg-gray-50"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()}
              className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50"
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Health Profile */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-teal-600">
            <Heart className="w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-800">Your Health Profile</h2>
          </div>

          {/* Weight and Height */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Weight</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300"
                />
                <Select defaultValue="kg">
                  <SelectTrigger className="w-16 rounded-lg border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Height</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300"
                />
                <Select defaultValue="cm">
                  <SelectTrigger className="w-16 rounded-lg border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Average Sleep */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-gray-500" />
              <Label className="text-sm font-medium text-gray-600">Average Sleep (hours/night)</Label>
            </div>
            <Input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="rounded-lg border-gray-300 bg-gray-50"
            />
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-gray-500" />
              <Label className="text-sm font-medium text-gray-600">Activity Level</Label>
            </div>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger className="rounded-lg border-gray-300 bg-gray-50">
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                <SelectItem value="light">Light (Exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (Exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (Exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (Intense exercise daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Health Goals */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <Label className="text-sm font-medium text-gray-600">Health Goals</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {healthGoals.map((goal) => (
                <Badge
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`cursor-pointer transition-all ${
                    selectedGoals.includes(goal)
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <Card className="border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Estimated BMI</p>
                <p className="text-3xl font-bold text-teal-600">
                  {weight && height ? ((parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1)) : "--"}
                </p>
                <p className="text-xs text-gray-500">Based on your weight and height</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
