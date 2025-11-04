import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";

interface Product3DProps {
  color?: string;
  productName?: string;
}

// Simple 3D Sphere representing a fruit
const FruitModel = ({ color = "#A020F0" }: { color?: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Shine/highlight */}
      <mesh position={[0.3, 0.4, 0.5]} scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.4}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </Float>
  );
};

const Product3D = ({ color = "#A020F0", productName = "Product" }: Product3DProps) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-background">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#A020F0" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#4B0082" />

        <Suspense fallback={null}>
          <FruitModel color={color} />
          <Environment preset="city" />
        </Suspense>

        {/* Controls for rotation */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={6}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Product label */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
          <p className="text-sm font-medium">{productName}</p>
          <p className="text-xs text-muted-foreground">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
};

export default Product3D;
