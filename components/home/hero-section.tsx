"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      src: "/emerald-bracelet-detail-platinum.jpg",
      title: "Elegancia en cada detalle",
      description: "Brazaletes de platino con esmeraldas únicas, símbolo de lujo y tradición."
    },
    {
      src: "/emerald-earrings-close-up-detail.jpg",
      title: "Brillo que enamora",
      description: "Aretes con esmeraldas colombianas, diseñados para resaltar tu estilo."
    },
    {
      src: "/emerald-necklace-worn-model-elegant.jpg",
      title: "La naturaleza hecha arte",
      description: "Collares exclusivos que combinan esmeraldas con metales preciosos."
    },
    {
      src: "/luxury-emerald-diamond-drop-earrings-elegant.jpg",
      title: "Lujo y sofisticación",
      description: "Joyas con esmeraldas y diamantes, creadas para momentos inolvidables."
    }
    // 👉 Puedes añadir más objetos con {src, title, description}
  ];

  // Autoplay cada 10 segundos, con pause on hover
  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  // Actualizar índice seleccionado
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carrusel de fondo */}
      <div className="absolute inset-0 z-0 embla" ref={emblaRef}>
        <div className="embla__container flex transition-transform duration-700 ease-in-out">
          {slides.map((slide, index) => (
            <div
              className="embla__slide relative h-screen w-full flex-[0_0_100%] transition-opacity duration-700 ease-in-out"
              key={index}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Texto dinámico */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-background leading-tight mb-4">
          {slides[selectedIndex].title}
        </h1>
        <p className="text-lg text-background/80 mb-6 font-light">
          {slides[selectedIndex].description}
        </p>
        <div className="flex justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            <Link href="/catalogo">
              Explorar Colección
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-background/30 text-background hover:bg-background/10 px-8 bg-transparent"
          >
            <Link href="/cotizacion">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="absolute z-10 left-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="text-background/80 hover:text-background text-3xl"
        >
          ◀
        </button>
      </div>
      <div className="absolute z-10 right-4 top-1/2 -translate-y-1/2">
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="text-background/80 hover:text-background text-3xl"
        >
          ▶
        </button>
      </div>

      {/* Dots de paginación */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full ${
              selectedIndex === index ? "bg-background" : "bg-background/40"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </section>
  );
}