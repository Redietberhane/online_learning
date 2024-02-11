import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const CourseSectionList = ({ onSectionClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const courseSections = [
      { id: 1, title: 'Chapter 1: Introduction', content: 'This is the introduction content.', type: 'chapter' },
      { id: 2, title: 'Chapter 2: Basics of React', content: 'This is the React basics content.', type: 'chapter' },
      { id: 3, title: 'Quiz 1: JavaScript Fundamentals', content: 'This is the JavaScript fundamentals quiz.', type: 'quiz' },
      { id: 4, title: 'Assignment 1: React Components', content: 'This is the React components assignment.', type: 'assignment' },
      // Add more sections as needed
    ];
  
    const filteredSections = courseSections.filter((section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="absolute top-0 right-0 p-4 bg-white border-l border-t border-gray-300 shadow-lg w-2/5">
        <input
          type="text"
          placeholder="Search sections..."
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredSections.map((section) => (
            <li
              key={section.id}
              className={`hover:bg-gray-100 ${section.type === 'quiz' ? 'bg-yellow-100' : section.type === 'assignment' ? 'bg-blue-100' : ''}`}
            >
              <NavLink
                to={`/learning/section/${section.id}`} // Update the path as needed
                activeClassName="text-blue-500 font-semibold" // Style for the selected NavLink
              >
                {section.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default CourseSectionList;
