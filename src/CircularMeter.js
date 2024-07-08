import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularMeter = ({ value, maxValue }) => {
    // Set to 0 if value or maxValue is NaN, else calculate percentage
    const percentage = isNaN(value / maxValue) ? 0 : Math.round((value / maxValue) * 100);
    
    return (
        <div style={{ width: '100px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Text size
                    textSize: '16px',
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                    // Colors
                    pathColor: `#EAB63E`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            />
        </div>
    );
};

export default CircularMeter;