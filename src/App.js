import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const POINTS_COUNT = 5;

  const createPoints = () => {
    const pts = [];
    for (let i = 0; i < POINTS_COUNT; i++) {
      pts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        xv: 1,
        yv: 1,
      });
    }

    setPoints(pts);
  };

  const drawPoints = (ctx) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createPoints();
    const animate = () => {
      drawPoints(ctx); // 点を描画
      updatePoints();
      requestAnimationFrame(animate); // アニメーションのループ
    };

    animate();
  }, [points]);

  const updatePoints = () => {
    setPoints((prevPoints) =>
      prevPoints.map((pt) => {
        // 点の位置を更新
        let newX = pt.x + pt.xv;
        let newY = pt.y + pt.yv;

        // 壁に当たった時の処理
        if (newX < 0 || newX > window.innerWidth) pt.dx *= -1;
        if (newY < 0 || newY > window.innerHeight) pt.dy *= -1;

        return { ...pt, x: newX, y: newY };
      })
    );
  };
  return <canvas ref={canvasRef} style={{ backgroundColor: "black" }} />;
};

export default App;
