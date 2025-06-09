export interface GenerationParams {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  success: boolean;
  progress: number;
  retryCount: number;
}

export interface SizeOption {
  value: string;
  label: string;
  icon: any;
}

export interface StyleOption {
  value: string;
  label: string;
  description: string;
} 