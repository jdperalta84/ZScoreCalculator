import { useState, useEffect } from "react";
import { Calculator, User, TrendingUp, BarChart3, Info, RotateCcw, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface ZScoreResult {
  zScore: number;
  interpretation: string;
  colorClass: string;
  signText: string;
}

export default function Home() {
  const [yourResult, setYourResult] = useState<string>("");
  const [programMean, setProgramMean] = useState<string>("");
  const [standardDev, setStandardDev] = useState<string>("");
  const [result, setResult] = useState<ZScoreResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (!yourResult || isNaN(parseFloat(yourResult))) {
      newErrors.yourResult = "Please enter a valid number";
    }

    if (!programMean || isNaN(parseFloat(programMean))) {
      newErrors.programMean = "Please enter a valid number";
    }

    if (!standardDev || isNaN(parseFloat(standardDev)) || parseFloat(standardDev) <= 0) {
      newErrors.standardDev = "Standard deviation must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateZScore = () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before calculating.",
        variant: "destructive",
      });
      return;
    }

    const yourVal = parseFloat(yourResult);
    const meanVal = parseFloat(programMean);
    const stdVal = parseFloat(standardDev);

    const zScore = (yourVal - meanVal) / stdVal;

    let interpretation = "";
    let colorClass = "";
    let signText = "";

    if (zScore > 0) {
      colorClass = "text-green-600";
      signText = `${Math.abs(zScore).toFixed(3)} standard deviations above the mean`;
      if (zScore >= 2) {
        interpretation = "Your result is significantly above average. This places you in the top tier of performance.";
      } else if (zScore >= 1) {
        interpretation = "Your result is above average, indicating good performance relative to the program mean.";
      } else {
        interpretation = "Your result is slightly above average, showing positive deviation from the mean.";
      }
    } else if (zScore < 0) {
      colorClass = "text-orange-600";
      signText = `${Math.abs(zScore).toFixed(3)} standard deviations below the mean`;
      if (zScore <= -2) {
        interpretation = "Your result is significantly below average. Consider reviewing areas for improvement.";
      } else if (zScore <= -1) {
        interpretation = "Your result is below average, indicating room for improvement relative to the program mean.";
      } else {
        interpretation = "Your result is slightly below average, showing minor negative deviation from the mean.";
      }
    } else {
      colorClass = "text-gray-900";
      signText = "exactly at the mean";
      interpretation = "Your result is exactly at the program average, indicating typical performance.";
    }

    setResult({
      zScore,
      interpretation,
      colorClass,
      signText,
    });
  };

  const resetForm = () => {
    setYourResult("");
    setProgramMean("");
    setStandardDev("");
    setResult(null);
    setErrors({});
  };

  // Real-time calculation when all fields have values
  useEffect(() => {
    if (yourResult && programMean && standardDev && !errors.yourResult && !errors.programMean && !errors.standardDev) {
      const yourVal = parseFloat(yourResult);
      const meanVal = parseFloat(programMean);
      const stdVal = parseFloat(standardDev);

      if (!isNaN(yourVal) && !isNaN(meanVal) && !isNaN(stdVal) && stdVal > 0) {
        calculateZScore();
      }
    }
  }, [yourResult, programMean, standardDev]);

  const handleInputChange = (value: string, setter: (val: string) => void, field: string) => {
    setter(value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Z-Score Calculator</h1>
              <p className="text-sm text-gray-600">Calculate standard deviations from the mean</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Enter Values</CardTitle>
              <p className="text-sm text-gray-600">Fill in all three fields to calculate your z-score</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Your Result Input */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="yourResult" className="text-sm font-medium text-gray-700">
                    Your Result
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the score or value you want to compare against the program average</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    id="yourResult"
                    type="number"
                    step="any"
                    placeholder="Enter your score or value"
                    value={yourResult}
                    onChange={(e) => handleInputChange(e.target.value, setYourResult, "yourResult")}
                    className={`pr-10 ${errors.yourResult ? "border-red-500" : ""}`}
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.yourResult && (
                  <p className="text-sm text-red-600 flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    {errors.yourResult}
                  </p>
                )}
              </div>

              {/* Program Mean Input */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="programMean" className="text-sm font-medium text-gray-700">
                    Program Mean (μ)
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The average score or value for the entire program or dataset</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    id="programMean"
                    type="number"
                    step="any"
                    placeholder="Enter the program average"
                    value={programMean}
                    onChange={(e) => handleInputChange(e.target.value, setProgramMean, "programMean")}
                    className={`pr-10 ${errors.programMean ? "border-red-500" : ""}`}
                  />
                  <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.programMean && (
                  <p className="text-sm text-red-600 flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    {errors.programMean}
                  </p>
                )}
              </div>

              {/* Standard Deviation Input */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="standardDev" className="text-sm font-medium text-gray-700">
                    Standard Deviation (σ)
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>A measure of how spread out the data is from the mean (must be positive)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    id="standardDev"
                    type="number"
                    step="any"
                    min="0.00001"
                    placeholder="Enter standard deviation"
                    value={standardDev}
                    onChange={(e) => handleInputChange(e.target.value, setStandardDev, "standardDev")}
                    className={`pr-10 ${errors.standardDev ? "border-red-500" : ""}`}
                  />
                  <BarChart3 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.standardDev && (
                  <p className="text-sm text-red-600 flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    {errors.standardDev}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <Button 
                  onClick={calculateZScore}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!yourResult || !programMean || !standardDev}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Z-Score
                </Button>
                <Button 
                  variant="outline"
                  onClick={resetForm}
                  className="px-6"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Results</CardTitle>
              <p className="text-sm text-gray-600">Your calculated z-score and interpretation</p>
            </CardHeader>
            <CardContent>
              {!result ? (
                // Empty State
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Enter your values in the form to see your z-score calculation and interpretation.
                  </p>
                </div>
              ) : (
                // Results Display
                <div className="space-y-6">
                  {/* Z-Score Value */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">Z-Score</div>
                      <div className={`text-4xl font-bold mb-2 ${result.colorClass}`}>
                        {result.zScore.toFixed(3)}
                      </div>
                      <div className="text-sm text-gray-600">{result.signText}</div>
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-medium text-gray-900 mb-1">Interpretation</h4>
                      <p className="text-sm text-gray-600">{result.interpretation}</p>
                    </div>

                    {/* Statistical Context */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Statistical Context
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Z-score of 0 = exactly at the mean</li>
                        <li>• Z-score of ±1 = within 1 standard deviation (68% of data)</li>
                        <li>• Z-score of ±2 = within 2 standard deviations (95% of data)</li>
                        <li>• Z-score of ±3 = within 3 standard deviations (99.7% of data)</li>
                      </ul>
                    </div>

                    {/* Calculation Formula */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Calculator className="mr-2 h-4 w-4" />
                        Formula Used
                      </h4>
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        Z = (X - μ) / σ
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Where X = your result, μ = mean, σ = standard deviation
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              About Z-Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What is a Z-Score?</h4>
                <p>
                  A z-score measures how many standard deviations a data point is from the mean. 
                  It helps you understand where your result stands relative to the average performance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">How to Interpret</h4>
                <p>
                  Positive z-scores indicate above-average performance, while negative z-scores indicate 
                  below-average performance. The larger the absolute value, the more extreme the result.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
