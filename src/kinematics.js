import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './kinematics.css';
import { motion } from "framer-motion";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';




function Kinematics() {
  const navigate = useNavigate(); // Hook for navigation
  const [distance, setDistance] = useState(0); // State to track the distance traveled
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 }); // State to track the last position of the box
  const [speed, setSpeed] = useState(0); // Total distance traveled
  const [velocity, setVelocity] = useState(0); // Displacement over time
  const [velocityLastPosition, setVelocityLastPosition] = useState({ x: 0, y: 0 }); // Last position of the red box
  const [startTime, setStartTime] = useState(null); // Start time of the simulation

  const box = {
    width: "150px",
    height: "150px",
    backgroundColor: "#a68bad",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
  };

  function Gestures() {
    return (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={box}
      >
        <strong>Interactive Box</strong>
      </motion.div>
    );
  }
  const [boxTexts] = useState([
    { term: 'Vector', def: 'Has both magnitude and direction. For example “driving 30 mph north” would be a vector' },
    { term: 'Scalar', def: 'Has magnitude but no direction. For example “driving 30 mph” would be a scalar' },
    { term: 'Distance', def: 'How far something travels over the course of the entire journey: If you travel 3 feet to the left and 1 foot to the right, your distance would be 4 feet. This wouldn’t be a vector because it doesn’t have a direction associated with it because you travel in different directions during the journey.' },
    { term: 'Displacement', def: 'How far something has traveled at the end of a journey: If you travel 3 feet to the left and 1 foot to the right you’re displaced 2 feet to the right. This would be a vector because it has a direction associated with it, (to the right).' },
    { term: 'Speed', def: 'How much distance was traveled in a certain amount of time.' },
    { term: 'Velocity', def: 'How far something was displaced in the time it took for that object to be displaced. This is a vector because displacement is a vector' },
  ]);

  // Track which boxes are flipped
  const [flipped, setFlipped] = useState(Array(boxTexts.length).fill(false));

  // Flip handler
  const handleFlip = (index) => {
    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);
  };

  return (
    <div style={{ position: 'relative', backgroundColor: '#e3cfe8', padding: '20px', overflow: 'auto' }}>
      {/* Back Button */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#a68bad',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/topics')}
      >
        Back
      </button>

      {/* Intro Paragraph */}
      <p style={{ textAlign: 'center', fontSize: '40px', marginTop: '50px', marginLeft: '15%', marginRight: '15%', color: '#333' }}>
        <b>Kinematics</b>
      </p>
      <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '75px', marginLeft: '15%', marginRight: '15%', color: '#333' }}>
        Kinematics is the branch of physics that deals with how objects move without considering the mass of objects or the forces acting on them. This lesson focuses on introducing you to the basics of kinematics and getting you comfortable with terms which will both be built on in firther lessons. Below are the first set of terms.
      </p>

      {/* Flippable Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginTop: '20px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        {boxTexts.map((item, index) => (
          <div
            key={index}
            onClick={() => handleFlip(index)}
            style={{
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '150px',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#a68bad',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <strong>{item.term}</strong>
              </div>

              {/* Back Side */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#F4EAF7',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  padding: '10px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                }}
              >
                {item.def}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*start of box stuffery*/}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', marginTop: '50px' }}>
        {/* Coordinate Plane */}
        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            border: '1px solid #a68bad',
            backgroundColor: '#ffffff',
          }}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={(e) => {
            const plane = e.currentTarget; // The larger coordinate plane
            const box = document.getElementById('movableBox'); // The blue box
            const { offsetX, offsetY } = JSON.parse(
              e.dataTransfer.getData('text/plain')
            ); // Retrieve the offset
            const rect = plane.getBoundingClientRect(); // Get the bounding rectangle of the plane
            const x = e.clientX - rect.left - offsetX; // Calculate the new x position
            const y = e.clientY - rect.top - offsetY; // Calculate the new y position

            // Ensure the box stays within the bounds of the coordinate plane
            const clampedX = Math.max(
              0,
              Math.min(x, plane.clientWidth - box.clientWidth)
            );
            const clampedY = Math.max(
              0,
              Math.min(y, plane.clientHeight - box.clientHeight)
            );

            // Update the position of the blue box
            box.style.left = `${clampedX}px`;
            box.style.top = `${clampedY}px`;

            // Calculate the distance traveled
            const dx = clampedX - lastPosition.x;
            const dy = clampedY - lastPosition.y;
            const traveled = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
            setDistance((prevDistance) => prevDistance + traveled);

            // Update the last position
            setLastPosition({ x: clampedX, y: clampedY });
          }}
        >
        {/* Reload Button */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
          onClick={() => {
            // Reset the blue box position
            const box = document.getElementById('movableBox');
            box.style.left = '0px';
            box.style.top = '0px';

            // Reset distance and last position
            setDistance(0);
            setLastPosition({ x: 0, y: 0 });
          }}
        >
          Reload
        </button>
          <div
            id="movableBox"
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              backgroundColor: '#007bff',
              cursor: 'grab',
            }}
            draggable
            onDragStart={(e) => {
              // Store the offset of the mouse pointer relative to the box
              e.dataTransfer.setData(
                'text/plain',
                JSON.stringify({
                  offsetX: e.nativeEvent.offsetX,
                  offsetY: e.nativeEvent.offsetY,
                })
              );
            }}
          ></div>
        </div>
        {/* Displacement Display */}
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            fontSize: '16px',
            color: '#333',
            width: '200px',
            textAlign: 'center',
          }}
        >
          <p><strong>Displacement:</strong></p>
          <p>{Math.sqrt(lastPosition.x ** 2 + lastPosition.y ** 2).toFixed(2)} px</p>
          <p><strong>Distance Traveled:</strong></p>
          <p>{distance.toFixed(2)} px</p>
        </div>
      </div>
      {/*end of stuffery*/}
      {/* Additional stuff*/}
      {/* Second Simulation: Speed and Velocity */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', marginTop: '50px' }}>
        {/* Coordinate Plane */}
        <div
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            border: '1px solid #a68bad',
            backgroundColor: '#ffffff',
          }}
          onDragOver={(e) => e.preventDefault()} // Allow dropping
          onDrop={(e) => {
            const plane = e.currentTarget; // The larger coordinate plane
            const box = document.getElementById('velocityBox'); // The red box
            const { offsetX, offsetY } = JSON.parse(
              e.dataTransfer.getData('text/plain')
            ); // Retrieve the offset
            const rect = plane.getBoundingClientRect(); // Get the bounding rectangle of the plane
            const x = e.clientX - rect.left - offsetX; // Calculate the new x position
            const y = e.clientY - rect.top - offsetY; // Calculate the new y position

            // Ensure the box stays within the bounds of the coordinate plane
            const clampedX = Math.max(
              0,
              Math.min(x, plane.clientWidth - box.clientWidth)
            );
            const clampedY = Math.max(
              0,
              Math.min(y, plane.clientHeight - box.clientHeight)
            );

            // Update the position of the red box
            box.style.left = `${clampedX}px`;
            box.style.top = `${clampedY}px`;

            // Calculate displacement and velocity
            const dx = clampedX - velocityLastPosition.x;
            const dy = clampedY - velocityLastPosition.y;
            const displacement = Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
            const currentTime = performance.now();
            const timeElapsed = (currentTime - startTime) / 1000; // Time in seconds

            if (timeElapsed > 0) {
              setVelocity(displacement / timeElapsed); // Velocity = displacement / time
              setSpeed((prevSpeed) => prevSpeed + displacement); // Speed = total distance traveled
            }

            // Update the last position
            setVelocityLastPosition({ x: clampedX, y: clampedY });
          }}
        >
          {/* Reload Button for Second Simulation */}
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '10px 20px',
              fontSize: '16px',
            }}
            onClick={() => {
              // Reset the red box position
              const box = document.getElementById('velocityBox');
              box.style.left = '0px';
              box.style.top = '0px';

              // Reset speed, velocity, last position, and start time
              setSpeed(0);
              setVelocity(0);
              setVelocityLastPosition({ x: 0, y: 0 });
              setStartTime(null);
            }}
          >
            Reload
          </button>
          <div
            id="velocityBox"
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              backgroundColor: '#ff0000',
              cursor: 'grab',
            }}
            draggable
            onDragStart={(e) => {
              // Start the timer on the first drag
              if (!startTime) {
                setStartTime(performance.now());
              }

              // Store the offset of the mouse pointer relative to the box
              e.dataTransfer.setData(
                'text/plain',
                JSON.stringify({
                  offsetX: e.nativeEvent.offsetX,
                  offsetY: e.nativeEvent.offsetY,
                })
              );
            }}
          ></div>
        </div>
        {/* Speed and Velocity Display */}
      <div
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontSize: '16px',
          color: '#333',
          width: '200px',
          textAlign: 'center',
        }}
      >
        <p><strong>Speed:</strong></p>
        <p>{speed.toFixed(2)} px/s</p>
        <p><strong>Velocity:</strong></p>
        <p>{velocity.toFixed(2)} px/s</p>

        {/* Additional Info Box */}
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <p><strong>Time:</strong> {((startTime ? performance.now() - startTime : 0) / 1000).toFixed(2)} s</p>
          <p><strong>Displacement:</strong> {Math.sqrt(velocityLastPosition.x ** 2 + velocityLastPosition.y ** 2).toFixed(2)} px</p>
          <p><strong>Distance:</strong> {speed.toFixed(2)} px</p>
        </div>
      </div>
      {/* end of additional stuff */}
      </div>
      {/* End of Second Simulation */}
      {/* Acceleration Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#F4EAF7',
          fontSize: '16px',
          color: '#333',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2>Formulas</h2>
        <p>
        We can take the definition of velocity that was just given and use it to form an equation for velocity. <br></br><br></br>

Using the definition of velocity – change in displacement over change in time –  the equation would be V = X/T. This is also shown in how we describe velocity in everyday life: miles per hour (mph), meters per second (m/s). If you traveled 5 miles in a 10 minute car ride, you would have the velocity being 0.5 miles per minute or 30 miles per hour.

        </p>
        
      </div>
      {/* Velocity Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#F4EAF7',
          fontSize: '16px',
          color: '#333',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Acceleration</h2>
        <p>
        You may notice an issue with the previous example, when you go on a car ride you aren’t always going at 30mph, more often than not your velocity fluctuates during the car ride. This is where acceleration comes into play. Acceleration is the change in velocity over the change in time. Acceleration is described as m/s^2 because it is the change in velocity (m/s) divided by time (s).<br></br><br></br> For example, say you're running and go from 1 m/s to 6m/s in 2 seconds, the acceleration would the change in velocity (5m/s) over the change in time (2 seconds) and thus be (5m/s) / (2s) or 2.5m/s^2. 
        </p>
        {/*add v=x/t here*/}
      </div>
      {/* Equations Info Section */}
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#F4EAF7',
          fontSize: '16px',
          color: '#333',
          textAlign: 'center',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Equations of Motion</h2>
        <p>
          In kinematics, equations of motion are used to describe the relationship between displacement, velocity, acceleration, and time. These equations are particularly useful for solving problems involving uniformly accelerated motion. The three main equations are:
        </p>
        <ul style={{ textAlign: 'left', marginTop: '10px' }}>
          <li><strong>v = u + at</strong> - Final velocity (v) is equal to initial velocity (u) plus acceleration (a) multiplied by time (t).</li>
          <li><strong>s = ut + 0.5at²</strong> - Displacement (s) is equal to initial velocity (u) multiplied by time (t) plus half the acceleration (a) multiplied by time squared (t²).</li>
          <li><strong>v² = u² + 2as</strong> - The square of the final velocity (v) is equal to the square of the initial velocity (u) plus two times acceleration (a) multiplied by displacement (s).</li>
        </ul>
        <p>
          These equations assume constant acceleration and are fundamental in solving motion-related problems in physics.
        </p>

         
      </div>
    </div>
    
        );
}


export default Kinematics;