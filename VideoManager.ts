// Video Content Management System for Gargaar AI Learning Academy
// Supports multiple video sources: YouTube, Vimeo, direct URLs, HLS streaming

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: number; // seconds
  thumbnail: string;
  source: 'youtube' | 'vimeo' | 'url' | 'hls';
  sourceId: string; // YouTube ID, Vimeo ID, or URL
  courseLevel: 'beginner' | 'intermediate' | 'advanced' | 'university';
  topic: string;
  transcript?: string;
  captions?: {
    language: string;
    url: string;
  }[];
  uploadedAt: number;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  videos: VideoContent[];
  readingMaterials?: string[];
  quiz?: string[];
  order: number;
}

export const VideoManager = {
  // Create video embedding code
  getEmbedCode(video: VideoContent): string {
    switch (video.source) {
      case 'youtube':
        return `<iframe width="100%" height="600" src="https://www.youtube.com/embed/${video.sourceId}" frameborder="0" allowfullscreen></iframe>`;
      
      case 'vimeo':
        return `<iframe src="https://player.vimeo.com/video/${video.sourceId}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      
      case 'url':
        return `<video width="100%" height="600" controls><source src="${video.sourceId}" type="video/mp4">Your browser does not support the video tag.</video>`;
      
      case 'hls':
        return `<video width="100%" height="600" controls><source src="${video.sourceId}" type="application/x-mpegURL">Your browser does not support the video tag.</video>`;
      
      default:
        return '';
    }
  },

  // Get video duration formatted
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  },

  // Create video thumbnail
  getThumbnail(video: VideoContent): string {
    if (video.thumbnail) return video.thumbnail;
    
    switch (video.source) {
      case 'youtube':
        return `https://img.youtube.com/vi/${video.sourceId}/maxresdefault.jpg`;
      default:
        return 'https://via.placeholder.com/640x360?text=Video+Thumbnail';
    }
  },

  // Check if video can be played (fast loading)
  canPlayFast(video: VideoContent): boolean {
    // YouTube and Vimeo are optimized for fast streaming
    return video.source === 'youtube' || video.source === 'vimeo';
  },

  // Save video to localStorage
  saveVideo(video: VideoContent): void {
    localStorage.setItem(`gargaar_video_${video.id}`, JSON.stringify(video));
  },

  // Get video by ID
  getVideo(videoId: string): VideoContent | null {
    const data = localStorage.getItem(`gargaar_video_${videoId}`);
    return data ? JSON.parse(data) : null;
  },

  // Get all videos for a course level
  getVideosByLevel(level: string): VideoContent[] {
    const videos: VideoContent[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('gargaar_video_')) {
        const data = localStorage.getItem(key);
        if (data) {
          const video = JSON.parse(data);
          if (video.courseLevel === level) videos.push(video);
        }
      }
    }
    return videos;
  },

  // Sample courses with video lessons
  getSampleCourseVideos: () => [
    {
      level: 'beginner',
      lessons: [
        {
          id: 'beginner_1',
          title: 'What is Artificial Intelligence?',
          videos: [
            {
              id: 'vid_1',
              title: 'Introduction to AI',
              description: 'Learn the fundamentals of AI',
              duration: 600,
              source: 'youtube',
              sourceId: 'dQw4w9WgXcQ',
              courseLevel: 'beginner',
              topic: 'AI Fundamentals',
              uploadedAt: Date.now(),
            },
          ],
        },
        {
          id: 'beginner_2',
          title: 'Machine Learning Basics',
          videos: [
            {
              id: 'vid_2',
              title: 'ML Concepts',
              description: 'Understand ML concepts',
              duration: 1200,
              source: 'youtube',
              sourceId: 'ZzZ_nRKsCKE',
              courseLevel: 'beginner',
              topic: 'AI Fundamentals',
              uploadedAt: Date.now(),
            },
          ],
        },
      ],
    },
    {
      level: 'intermediate',
      lessons: [
        {
          id: 'intermediate_1',
          title: 'Deep Learning Fundamentals',
          videos: [
            {
              id: 'vid_3',
              title: 'Neural Networks',
              description: 'Deep dive into neural networks',
              duration: 1800,
              source: 'youtube',
              sourceId: 'aircAruvnKk',
              courseLevel: 'intermediate',
              topic: 'Machine Learning',
              uploadedAt: Date.now(),
            },
          ],
        },
      ],
    },
  ],
};

export default VideoManager;
