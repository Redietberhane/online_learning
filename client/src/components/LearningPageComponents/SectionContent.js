import React from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PdfViewer from './PdfViewer'; // You'll need to implement this component
import Quiz from './Quiz'; // You'll need to implement this component
import Overview from './Overview';
import Review from './Review';
const SectionContent = () => {
  const { sectionId } = useParams();

  // Define your course sections here, including video/file URLs
  const courseSections = [
    { id: 1, title: 'Chapter 1: Introduction', type: 'video', content: 'https://example.com/video.mp4' },
    { id: 2, title: 'Chapter 2: Basics of React', type: 'video', content: 'https://example.com/video.mp4' },
    { id: 3, title: 'Quiz 1: JavaScript Fundamentals', type: 'quiz', content: 'https://typeform.com/your-quiz-url' },
    { id: 4, title: 'Assignment 1: React Components', type: 'pdf', content: 'https://example.com/assignment.pdf' },
    // Add more sections as needed
  ];

  const section = courseSections.find((s) => s.id === parseInt(sectionId));

  return (
    <div>
      {section ? (
        <div>
          <h2>{section.title}</h2>

          {/* Conditional rendering based on section type */}
          {section.type === 'video' && (
            <div>
              <h3>Video</h3>
              <ReactPlayer url={section.content} controls />
            </div>
          )}

          {section.type === 'quiz' && (
            <div>
              <h3>Quiz</h3>
              <iframe title="Quiz" src={section.content} width="100%" height="500" />
            </div>
          )}

{section.type === 'pdf' && (
  <div>
    <h3>Assignment</h3>
    <PdfViewer url={section.content} />
  </div>
)}

{section.type === 'quiz' && (
  <div>
    <h3>Quiz</h3>
    <Quiz url={section.content} />
  </div>
)}

{/* Sub-navigation for Overview and Review */}
<nav>
  <ul>
    <li>
      <Link to={`/section/${sectionId}/overview`}>Overview</Link>
    </li>
    <li>
      <Link to={`/section/${sectionId}/review`}>Review</Link>
    </li>
  </ul>
</nav>

{/* Nested routes for Overview and Review */}
<Routes>
  <Route path="/overview" element={<Overview />} />
  <Route path="/review" element={<Review />} />
</Routes>

        </div>
      ) : (
        <p>Section not found.</p>
      )}
    </div>
  );
};

export default SectionContent;
