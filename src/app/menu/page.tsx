'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface MenuItem {
  name: string
  description: string
  image: string
  calories: number
  protein: string
  carbs: string
  fat: string
  meal: 'lunch' | 'dinner'
}

interface DayMenu {
  day: string
  items: MenuItem[]
}

const mondayDelivery: DayMenu[] = [
  {
    day: 'Monday',
    items: [
      {
        name: 'Grass-Fed Beef Empanadas',
        description: 'With chimichurri dipping sauce + side salad',
        image: '/assets/menu-empanadas.png',
        calories: 520,
        protein: '28g',
        carbs: '42g',
        fat: '26g',
        meal: 'lunch',
      },
      {
        name: 'Pepper Steak & Celery Stir-Fry',
        description: 'With lemon and steamed rice',
        image: '/assets/menu-pepper-steak.png',
        calories: 580,
        protein: '35g',
        carbs: '52g',
        fat: '22g',
        meal: 'dinner',
      },
    ],
  },
  {
    day: 'Tuesday',
    items: [
      {
        name: 'Beef Cheek Quesadillas',
        description: 'With fresh guacamole and pico de gallo + side salad',
        image: '/assets/menu-quesadillas.png',
        calories: 640,
        protein: '38g',
        carbs: '48g',
        fat: '32g',
        meal: 'lunch',
      },
      {
        name: 'Crispy Potato Wedges & Whipped Pesto Feta',
        description: 'With slow-roasted salmon and green olive chutney',
        image: '/assets/menu-salmon-potatoes.png',
        calories: 620,
        protein: '32g',
        carbs: '38g',
        fat: '36g',
        meal: 'dinner',
      },
    ],
  },
  {
    day: 'Wednesday',
    items: [
      {
        name: 'Spring Chicken',
        description: 'With red pepper/sun-dried tomato hummus, brown lentils, roasted cauliflower & quinoa',
        image: '/assets/menu-spring-chicken.png',
        calories: 540,
        protein: '42g',
        carbs: '45g',
        fat: '18g',
        meal: 'lunch',
      },
      {
        name: "Mom's Meatloaf",
        description: 'With marinara sauce and cauliflower mash',
        image: '/assets/menu-meatloaf.png',
        calories: 580,
        protein: '36g',
        carbs: '32g',
        fat: '28g',
        meal: 'dinner',
      },
    ],
  },
]

const thursdayDelivery: DayMenu[] = [
  {
    day: 'Thursday',
    items: [
      {
        name: 'Chicken Cordon Bleu',
        description: 'With scalloped potatoes',
        image: '/assets/menu-cordon-bleu.png',
        calories: 680,
        protein: '45g',
        carbs: '38g',
        fat: '36g',
        meal: 'lunch',
      },
      {
        name: 'Roasted Cauliflower Green Salad',
        description: 'With green goddess dressing + grilled steak',
        image: '/assets/menu-steak-salad.png',
        calories: 520,
        protein: '38g',
        carbs: '22g',
        fat: '32g',
        meal: 'dinner',
      },
    ],
  },
  {
    day: 'Friday',
    items: [
      {
        name: '4-Cheese Truffle Gnocchi',
        description: 'With panzanella salad',
        image: '/assets/menu-gnocchi.png',
        calories: 720,
        protein: '24g',
        carbs: '68g',
        fat: '38g',
        meal: 'lunch',
      },
      {
        name: 'Slow-Braised Beef Ragu Lasagne',
        description: 'With béchamel, mozzarella and Parmigiano Reggiano',
        image: '/assets/menu-lasagne.png',
        calories: 780,
        protein: '42g',
        carbs: '58g',
        fat: '40g',
        meal: 'dinner',
      },
    ],
  },
]

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: '#fff',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '1px solid #000',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: '#f5f5f5' }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'contain' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: item.meal === 'lunch' ? 'var(--color-orange)' : 'var(--color-green)',
            color: '#fff',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {item.meal}
        </span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-black)' }}>
          {item.name}
        </h3>
        <p style={{ fontSize: '1.3rem', color: 'var(--color-grey)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {item.description}
        </p>
        <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-orange)' }}>
              {item.calories} cal
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', color: 'var(--color-grey)' }}>
            <span>P: {item.protein}</span>
            <span>C: {item.carbs}</span>
            <span>F: {item.fat}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DeliverySection({ title, days, color }: { title: string; days: DayMenu[]; color: string }) {
  return (
    <section style={{ marginBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: color,
          padding: '2rem 3rem',
          borderRadius: '1rem',
          marginBottom: '3rem',
          border: '1px solid #000',
        }}
      >
        <h2 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>
          {title}
        </h2>
      </motion.div>
      {days.map((dayMenu) => (
        <div key={dayMenu.day} style={{ marginBottom: '4rem' }}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '2rem',
              color: 'var(--color-black)',
              textTransform: 'uppercase',
              letterSpacing: '0.05rem',
              borderBottom: '2px solid #000',
              paddingBottom: '1rem',
            }}
          >
            {dayMenu.day}
          </motion.h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
            }}
            className="menu-grid"
          >
            {dayMenu.items.map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default function MenuPage() {
  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-cream)',
          padding: '14rem 0 4rem',
          borderBottom: '1px solid #000',
        }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-name"
            style={{
              color: 'var(--color-black)',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            weekly menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'var(--color-grey)',
              textAlign: 'center',
              fontSize: '2rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Farm-to-table meals delivered fresh twice weekly. All dishes are chef-crafted with organic, locally-sourced ingredients.
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <DeliverySection
            title="Monday Delivery (Mon-Wed)"
            days={mondayDelivery}
            color="var(--color-orange)"
          />
          <DeliverySection
            title="Thursday Delivery (Thu-Fri)"
            days={thursdayDelivery}
            color="var(--color-green)"
          />
        </div>
      </section>

      {/* Order CTA */}
      <section style={{ background: 'var(--color-cream)', padding: '6rem 0', borderTop: '1px solid #000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-black)' }}>
              Ready to Order?
            </h2>
            <p style={{ fontSize: '1.6rem', color: 'var(--color-grey)', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
              Subscribe to our weekly meal plan and enjoy chef-crafted dishes delivered to your door.
            </p>
            <a
              href="https://sfsecretmenu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button primary"
              style={{ fontSize: '1.6rem', padding: '1.5rem 4rem' }}
            >
              ORDER NOW
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
