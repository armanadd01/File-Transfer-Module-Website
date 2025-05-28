import { Review, ReviewStatus, Feedback, ReviewFile } from '../types';

// Generate 500 mock reviews
const generateMockReviews = (): Review[] => {
  const statuses: ReviewStatus[] = ['draft', 'active', 'completed'];
  const fileTypes = ['pdf', 'docx', 'pptx', 'jpg', 'png', 'mp4', 'ai', 'psd', 'fig'];
  
  return Array.from({ length: 500 }, (_, index) => {
    const id = `rev-${index + 4000}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdDate = new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000);
    const numCollaborators = Math.floor(Math.random() * 5) + 1;
    const numFeedback = Math.floor(Math.random() * 10);
    const numFiles = Math.floor(Math.random() * 6) + 1;
    
    // Generate collaborators
    const collaborators = Array.from({ length: numCollaborators }, (_, i) => ({
      id: `collab-${(index * 10) + i}`,
      name: `Collaborator ${(index * 10) + i}`,
      email: `collaborator${(index * 10) + i}@example.com`,
      avatar: `/avatars/collaborator-${i}.png`
    }));
    
    // Generate files
    const files: ReviewFile[] = Array.from({ length: numFiles }, (_, i) => {
      const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      const fileSize = Math.floor(Math.random() * 100000000) + 100000; // 100KB to 100MB
      const uploadedDate = new Date(createdDate.getTime() + Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000);
      
      return {
        id: `file-${(index * 10) + i}`,
        fileName: `project-asset-${(index * 10) + i}.${fileType}`,
        fileSize,
        fileType,
        uploadedAt: uploadedDate.toISOString(),
        url: `/files/project-asset-${(index * 10) + i}.${fileType}`
      };
    });
    
    // Generate feedback
    const feedback: Feedback[] = Array.from({ length: numFeedback }, (_, i) => {
      const userId = Math.random() > 0.5 ? 'user-1' : `collab-${(index * 10) + (i % numCollaborators)}`;
      const userName = userId === 'user-1' ? 'Current User' : `Collaborator ${(index * 10) + (i % numCollaborators)}`;
      const commentDate = new Date(createdDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      
      return {
        id: `feedback-${(index * 100) + i}`,
        userId,
        userName,
        comment: `This is feedback comment #${i + 1} for review ${id}. ${Math.random() > 0.5 ? 'I think we should revise this section.' : 'Looks good to me!'}`,
        timestamp: commentDate.toISOString(),
        attachments: Math.random() > 0.7 ? [files[Math.floor(Math.random() * files.length)]] : undefined
      };
    });
    
    return {
      id,
      title: `Design Review ${index + 1}`,
      description: `This is a design review for project ${index + 1}. ${Math.random() > 0.5 ? 'Please provide feedback on the layout and color scheme.' : 'Looking for input on the user flow and interactions.'}`,
      createdAt: createdDate.toISOString(),
      status,
      author: {
        id: 'user-1',
        name: 'Current User',
        email: 'user@example.com',
        avatar: '/avatars/user-1.png'
      },
      collaborators,
      feedback,
      files
    };
  });
};

export const reviews = generateMockReviews();
