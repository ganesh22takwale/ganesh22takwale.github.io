import Hero3D from "./components/Hero3D"

export default function App() {
  return (
    <>
      {/* Philosophy / CTA */}
      <section id="philosophy">
        <Hero3D variant="color" />
      </section>

      {/* Systems page */}
      <section id="systems">
        <Hero3D variant="silver" />
      </section>
    </>
  )
}
