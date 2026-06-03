import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
	return (
		<span className='split-word'>
			{text.split("").map((char, i) => (
				<span
					key={i}
					className='split-letter'
					style={{ animationDelay: `${delay + i * 0.04}s` }}
				>
					{char}
				</span>
			))}
		</span>
	);
}

/* 3 petals max — each CSS animation creates a compositor layer */
const PETALS = [
	{ left: "8%",  top: "15%", size: 13, opacity: 0.34, delay: 0   },
	{ left: "88%", top: "20%", size: 11, opacity: 0.28, delay: 1.1 },
	{ left: "55%", top: "78%", size: 10, opacity: 0.22, delay: 2.0 },
];

const CherryPetal = memo(
	({ left, top, size, opacity, delay }: (typeof PETALS)[0]) => (
		<div
			aria-hidden='true'
			style={{
				position: "absolute",
				left,
				top,
				pointerEvents: "none",
				animation: `petalFloat ${8 + delay * 0.9}s ease-in-out ${delay}s infinite alternate`,
				opacity,
			}}
		>
			<svg viewBox='0 0 24 24' width={size} height={size} aria-hidden='true'>
				<path
					d='M12 2C14 6 19 7 17 13C15 17 9 17 7 13C5 7 10 6 12 2Z'
					fill='#E8799B'
				/>
				<path
					d='M12 2C10 6 5 7 7 13C9 17 15 17 17 13C19 7 14 6 12 2Z'
					fill='#F5A0BE'
					opacity='0.55'
				/>
				<circle cx='12' cy='11' r='1.5' fill='rgba(255,235,210,0.9)' />
			</svg>
		</div>
	),
);
CherryPetal.displayName = "CherryPetal";

/* ─────────────────────────────────────────
   CSS Tube — open top with visible rim,
   cylindrical straight sides, rounded base
───────────────────────────────────────── */
function SushiTube() {
	const tubeW = "clamp(100px, 13vw, 152px)";
	const tubeH = "clamp(300px, 38vw, 450px)";
	const rimW  = "clamp(112px, 14.5vw, 170px)"; // wider for 3D rim illusion

	return (
		<div
			role='img'
			aria-label='Nice Sushi — sushi w tubie na patyku'
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{/* ── TOP RIM — ellipse shows tube is a hollow container ── */}
			<div style={{
				width: rimW,
				height: "clamp(24px, 3vw, 38px)",
				position: "relative",
				zIndex: 3,
				marginBottom: -1,
			}}>
				{/* Outer rim ring */}
				<div style={{
					position: "absolute", inset: 0,
					borderRadius: "50%",
					background: "linear-gradient(to bottom, #D4EEEB 0%, #8BBDB8 55%, #52A09A 100%)",
					boxShadow: "0 5px 14px rgba(0,0,0,0.45), inset 0 -3px 6px rgba(0,60,50,0.3)",
				}} />
				{/* Inner opening — dark depth + sushi cross-section inside tube */}
				<div style={{
					position: "absolute",
					top: "15%", left: "7%", right: "7%", bottom: "10%",
					borderRadius: "50%",
					background: "radial-gradient(ellipse at 45% 35%, #1E3828 0%, #0D1F17 75%)",
					overflow: "hidden",
					boxShadow: "inset 0 3px 10px rgba(0,0,0,0.6)",
				}}>
					<svg viewBox="0 0 100 28" style={{ width: "100%", height: "100%" }} aria-hidden="true">
						<ellipse cx="50" cy="14" rx="50" ry="14" fill="#F5F0E8" opacity="0.88"/>
						<ellipse cx="50" cy="14" rx="47" ry="12" fill="#1A2E24"/>
						<ellipse cx="50" cy="14" rx="39" ry="9.8" fill="#F0EDE0"/>
						<ellipse cx="50" cy="14" rx="29" ry="7.2" fill="#8CB87A" opacity="0.85"/>
						<ellipse cx="50" cy="14" rx="19" ry="4.8" fill="#FF8058" opacity="0.92"/>
						<ellipse cx="50" cy="14" rx="10" ry="2.8" fill="#F8EED8" opacity="0.88"/>
						<ellipse cx="50" cy="14" rx="5"  ry="1.5" fill="#E85C35" opacity="0.9"/>
						<ellipse cx="35" cy="9"  rx="14" ry="4" fill="rgba(255,255,255,0.13)"/>
					</svg>
				</div>
			</div>

			{/* ── TUBE BODY ── */}
			<div
				style={{
					width: tubeW,
					height: tubeH,
					/* Flat top (tube opening) — rounded only at base */
					borderRadius: `0 0 clamp(44px,6vw,72px) clamp(44px,6vw,72px)`,
					position: "relative",
					overflow: "hidden",
					background: `linear-gradient(
          to right,
          #6AADA7 0%, #9FD4CE 12%, #C8ECEB 30%,
          #A8DDD9 50%, #7FC4BE 70%, #52A09A 85%, #337872 100%
        )`,
					boxShadow: `
          inset -18px 0 36px rgba(0,70,55,0.35),
          inset 10px 0 24px rgba(255,255,255,0.3),
          inset 0 -24px 48px rgba(0,50,40,0.22),
          inset 0 18px 30px rgba(255,255,255,0.1),
          0 40px 80px rgba(0,0,0,0.55),
          0 0 40px rgba(157,202,196,0.08)
        `,
				}}
			>
				{/* Vertical highlight */}
				<div
					aria-hidden='true'
					style={{
						position: "absolute",
						top: 0,
						bottom: 0,
						left: "20%",
						width: "12%",
						background:
							"linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.08), transparent)",
						borderRadius: "50%",
						pointerEvents: "none",
					}}
				/>

				{/* Cherry blossom SVG */}
				<svg
					viewBox='0 0 152 450'
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
					}}
					aria-hidden='true'
				>
					<path
						d='M 76 450 C 70 400 56 370 44 340 C 58 318 72 300 76 270 C 80 240 68 210 72 180 C 76 160 88 145 84 118 C 80 96 66 80 72 54'
						stroke='rgba(0,55,38,0.28)'
						strokeWidth='2.5'
						fill='none'
						strokeLinecap='round'
					/>
					<path
						d='M 76 270 C 92 258 106 248 114 232'
						stroke='rgba(0,55,38,0.22)'
						strokeWidth='1.8'
						fill='none'
						strokeLinecap='round'
					/>
					<path
						d='M 76 180 C 60 168 48 160 40 148'
						stroke='rgba(0,55,38,0.22)'
						strokeWidth='1.6'
						fill='none'
						strokeLinecap='round'
					/>
					{[
						[44, 340, 9],
						[72, 300, 7],
						[76, 270, 10],
						[72, 180, 8],
						[84, 118, 9],
						[72, 54, 7],
					].map(([cx, cy, r], i) => {
						const angles = Array.from({ length: 5 }, (_, k) => k * 72);
						return (
							<g key={i}>
								{angles.map((a, j) => {
									const rad = (a * Math.PI) / 180;
									const px = cx + Math.cos(rad) * r * 0.7;
									const py = cy + Math.sin(rad) * r * 0.7;
									return (
										<ellipse
											key={j}
											cx={px}
											cy={py}
											rx={r * 0.55}
											ry={r * 0.35}
											transform={`rotate(${a + 90},${px},${py})`}
											fill='rgba(232,121,155,0.65)'
										/>
									);
								})}
								<circle
									cx={cx}
									cy={cy}
									r={r * 0.25}
									fill='rgba(255,230,190,0.9)'
								/>
							</g>
						);
					})}
					{[
						[114, 232, 7],
						[40, 148, 7],
					].map(([cx, cy, r], i) => {
						const angles = [0, 72, 144, 216, 288];
						return (
							<g key={`s${i}`}>
								{angles.map((a, j) => {
									const rad = (a * Math.PI) / 180;
									const px = cx + Math.cos(rad) * r * 0.7;
									const py = cy + Math.sin(rad) * r * 0.7;
									return (
										<ellipse
											key={j}
											cx={px}
											cy={py}
											rx={r * 0.5}
											ry={r * 0.3}
											transform={`rotate(${a + 90},${px},${py})`}
											fill='rgba(232,121,155,0.5)'
										/>
									);
								})}
								<circle
									cx={cx}
									cy={cy}
									r={r * 0.22}
									fill='rgba(255,230,190,0.85)'
								/>
							</g>
						);
					})}
				</svg>

				{/* Brand text */}
				<div
					style={{
						position: "absolute",
						top: "52%",
						left: "50%",
						transform: "translate(-50%,-50%)",
						writingMode: "vertical-rl",
						textAlign: "center",
						userSelect: "none",
						zIndex: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 3,
					}}
				>
					<span
						style={{
							fontFamily: "var(--font-editorial)",
							fontStyle: "italic",
							fontSize: "clamp(14px, 1.8vw, 20px)",
							fontWeight: 600,
							color: "rgba(255,255,255,0.92)",
							letterSpacing: "0.1em",
							textShadow: "0 2px 8px rgba(0,50,40,0.4)",
						}}
					>
						Nice
					</span>
					<span
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(9px, 1.1vw, 13px)",
							fontWeight: 700,
							letterSpacing: "0.35em",
							color: "rgba(255,255,255,0.72)",
							textTransform: "uppercase",
							textShadow: "0 1px 4px rgba(0,50,40,0.5)",
						}}
					>
						Sushi
					</span>
				</div>

				{/* Bottom shade */}
				<div
					aria-hidden='true'
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: "14%",
						background:
							"linear-gradient(to top, rgba(0,40,30,0.38), transparent)",
						borderRadius: `0 0 clamp(44px,6vw,72px) clamp(44px,6vw,72px)`,
					}}
				/>
			</div>

			{/* ── STICK ── */}
			<div
				style={{
					width: "clamp(5px, 0.6vw, 8px)",
					height: "clamp(80px, 11vw, 130px)",
					background:
						"linear-gradient(to right, #5C3D28, #8B6040, #7A5035, #4A2E1A)",
					borderRadius: "4px",
					marginTop: -10,
					boxShadow: "3px 4px 14px rgba(0,0,0,0.55)",
				}}
			/>
		</div>
	);
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const stripRef = useRef<HTMLDivElement>(null);
	const tubeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const letters = sectionRef.current?.querySelectorAll(".split-letter");
			if (letters) {
				gsap.fromTo(
					letters,
					{ y: "108%", opacity: 0 },
					{
						y: "0%",
						opacity: 1,
						stagger: 0.04,
						duration: 1.0,
						ease: "power3.out",
						delay: 0.35,
					},
				);
			}

			gsap.fromTo(
				[subtitleRef.current, scrollRef.current, stripRef.current],
				{ opacity: 0, y: 18 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					stagger: 0.12,
					delay: 0.9,
				},
			);

			gsap.fromTo(
				tubeRef.current,
				{ opacity: 0, y: 40, rotate: -4 },
				{
					opacity: 1,
					y: 0,
					rotate: 0,
					duration: 1.3,
					ease: "power3.out",
					delay: 0.45,
				},
			);

			gsap.to(tubeRef.current, {
				y: -20,
				duration: 4.5,
				ease: "sine.inOut",
				repeat: -1,
				yoyo: true,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id='hero'
			ref={sectionRef}
			aria-label='Nice Sushi — strona główna'
			style={{
				height: "100svh",
				minHeight: 620,
				display: "grid",
				gridTemplateColumns: "1fr auto",
				alignItems: "center",
				position: "relative",
				background: "var(--bg)",
				overflow: "hidden",
				padding: "0 clamp(28px, 7vw, 96px)",
				gap: "clamp(24px, 4vw, 64px)",
			}}
		>
			{/* Glows */}
			<div
				aria-hidden='true'
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background:
						"radial-gradient(ellipse 80% 70% at 30% 55%, rgba(27,67,50,0.5) 0%, transparent 70%)",
				}}
			/>
			<div
				aria-hidden='true'
				style={{
					position: "absolute",
					right: 0,
					top: 0,
					bottom: 0,
					width: "45%",
					pointerEvents: "none",
					background:
						"radial-gradient(ellipse 80% 100% at 80% 50%, rgba(232,121,155,0.07) 0%, transparent 70%)",
				}}
			/>

			{PETALS.map((p, i) => (
				<CherryPetal key={i} {...p} />
			))}

			<div
				aria-hidden='true'
				style={{
					position: "absolute",
					left: 0,
					top: "18%",
					bottom: "18%",
					width: 2,
					background:
						"linear-gradient(to bottom, transparent, var(--pink), transparent)",
					opacity: 0.45,
				}}
			/>

			{/* ── LEFT: Typography ── */}
			<div style={{ position: "relative", zIndex: 2 }}>
				<div
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "12px",
						fontWeight: 500,
						letterSpacing: "0.32em",
						color: "var(--pink)",
						textTransform: "uppercase",
						marginBottom: 32,
						opacity: 0,
						animation: "fadeUp 0.6s ease forwards 0.2s",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					<span
						aria-hidden='true'
						style={{
							display: "block",
							width: 20,
							height: "1px",
							background: "var(--pink)",
						}}
					/>
					Katowice · Jedyne takie sushi
				</div>

				<h1
					style={{
						fontFamily: "var(--font-display)",
						fontWeight: 900,
						fontSize: "clamp(72px, 14.5vw, 192px)",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						lineHeight: 0.93,
						color: "var(--text)",
						overflow: "hidden",
						margin: 0,
					}}
				>
					<SplitText text='NICE' delay={0} />
				</h1>

				{/* × separator */}
				<div
					aria-hidden='true'
					style={{
						fontFamily: "var(--font-editorial)",
						fontStyle: "italic",
						fontSize: "clamp(15px, 2.1vw, 28px)",
						color: "var(--pink)",
						margin: "10px 0",
						letterSpacing: "0.5em",
						display: "flex",
						alignItems: "center",
						gap: "0.5em",
					}}
				>
					<span
						style={{
							display: "block",
							height: "1px",
							width: "clamp(18px, 3vw, 50px)",
							background: "linear-gradient(90deg, transparent, var(--pink))",
						}}
					/>
					×
					<span
						style={{
							display: "block",
							height: "1px",
							width: "clamp(18px, 3vw, 50px)",
							background: "linear-gradient(90deg, var(--pink), transparent)",
						}}
					/>
				</div>

				<h1
					style={{
						fontFamily: "var(--font-display)",
						fontWeight: 900,
						fontSize: "clamp(72px, 14.5vw, 192px)",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						lineHeight: 0.93,
						color: "transparent",
						WebkitTextStroke: "1.5px rgba(232,121,155,0.5)",
						overflow: "hidden",
						margin: 0,
					}}
				>
					<SplitText text='SUSHI' delay={0.16} />
				</h1>

				<div
					ref={subtitleRef}
					style={{ marginTop: "clamp(22px, 3vw, 40px)", opacity: 0 }}
				>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "clamp(15px, 1.4vw, 18px)",
							color: "var(--muted)",
							letterSpacing: "0.02em",
							lineHeight: 1.6,
						}}
					>
						Wirusowe sushi w tubie na patyku — jedyne w Katowicach
					</p>
				</div>
			</div>

			{/* ── RIGHT: CSS 3D Tube ── */}
			<div
				ref={tubeRef}
				className='hero-tube'
				style={{
					position: "relative",
					zIndex: 2,
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "center",
					paddingTop: 56,
					opacity: 0,
				}}
			>
				<SushiTube />
			</div>

			{/* Scroll indicator */}
			<div
				ref={scrollRef}
				style={{
					position: "absolute",
					bottom: 36,
					left: "50%",
					transform: "translateX(-50%)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 8,
					opacity: 0,
					zIndex: 2,
				}}
			>
				<span
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "11px",
						fontWeight: 500,
						letterSpacing: "0.35em",
						color: "var(--muted)",
						textTransform: "uppercase",
					}}
				>
					Scroll
				</span>
				<div
					aria-hidden='true'
					style={{
						width: 1,
						height: 36,
						background:
							"linear-gradient(to bottom, var(--pink-dim), transparent)",
						animation: "scrollPulse 2s ease-in-out infinite",
					}}
				/>
			</div>

			{/* Marquee */}
			<div
				ref={stripRef}
				aria-hidden='true'
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					background: "var(--pink)",
					height: 32,
					overflow: "hidden",
					display: "flex",
					alignItems: "center",
					opacity: 0,
					zIndex: 2,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "3em",
						alignItems: "center",
						animation: "marquee 26s linear infinite",
						whiteSpace: "nowrap",
						paddingLeft: "100%",
					}}
				>
					{Array.from({ length: 8 }).map((_, i) => (
						<span
							key={i}
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "11px",
								fontWeight: 600,
								letterSpacing: "0.32em",
								color: "rgba(13,31,23,0.85)",
								textTransform: "uppercase",
							}}
						>
							NICE SUSHI KATOWICE &nbsp;·&nbsp; SUSHI W TUBIE &nbsp;·&nbsp;
							JEDYNE W KATOWICACH &nbsp;·&nbsp;
						</span>
					))}
				</div>
			</div>

			<div
				aria-hidden='true'
				style={{
					position: "absolute",
					left: "clamp(14px, 2vw, 40px)",
					bottom: "36%",
					writingMode: "vertical-rl",
					transform: "rotate(180deg)",
					fontFamily: "var(--font-body)",
					fontSize: "11px",
					fontWeight: 400,
					letterSpacing: "0.28em",
					color: "var(--dim)",
					textTransform: "uppercase",
				}}
			>
				© 2025 Nice Sushi
			</div>

			<style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-22px) rotate(28deg); }
        }
        @media (max-width: 680px) {
          .hero-tube { display: none !important; }
          #hero { grid-template-columns: 1fr !important; }
        }
      `}</style>
		</section>
	);
}
