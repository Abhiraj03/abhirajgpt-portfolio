// app/components/Resume.tsx
"use client";

type Bullet = string;

type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  date: string;
  bullets: Bullet[];
};

type ProjectItem = {
  title: string;
  date?: string;
  bullets: Bullet[];
};

export default function Resume() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow p-6 md:p-8 text-sm leading-relaxed">
      {/* Header */}
      <header className="text-center space-y-1 mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">ABHIRAJ CHAUDHARY</h2>
        <div className="text-zinc-300">
          602-632-9828 | linkednabhiraj@gmail.com |
          <a href="https://www.linkedin.com" target="_blank" className="underline ml-1">LinkedIn</a> |
          <a href="https://abhirajc.com" target="_blank" className="underline ml-1">Portfolio</a>
        </div>
      </header>

      {/* Education */}
      <Section title="EDUCATION">
        <Row
          left="Arizona State University"
          right="May 2025"
          sub="Bachelor of Science in Computer Science"
          meta="GPA: 4.00"
        />
      </Section>

      {/* Technical Skills */}
      <Section title="TECHNICAL SKILLS">
        <KV label="Languages" value="Go, Python, C++, Kotlin, Java, TypeScript, JavaScript" />
        <KV label="Backend & Distributed Systems" value="gRPC, REST APIs, Microservices, Spring Boot, Node.js, Express, Django, FastAPI, GraphQL, Agile" />
        <KV label="Cloud & Infrastructure" value="AWS (EC2, S3, Lambda, DynamoDB, RDS, Redshift), Docker, Kubernetes, Jenkins, Terraform, Git, Jira" />
        <KV label="Data & ML" value="PostgreSQL, MongoDB, MySQL, Kafka, PyTorch, TensorFlow, Airflow" />
      </Section>

      {/* Experience */}
      <Section title="EXPERIENCE">
        <Experience
          role="Software Development Engineer Intern"
          org="Tweebaa Inc"
          location="Tempe, AZ"
          date="August 2024 – May 2025"
          bullets={[
            "Engineered secure, modular backend APIs in Kotlin for PayPal and Stripe multi-currency transactions, increasing success rates by 20%.",
            "Built backend RESTful APIs with modular design and tracing support to monitor service-level failures and response times.",
            "Spearheaded deployment pipelines on AWS (EC2, S3, Lambda) within a microservices architecture; launched to Google Play Store, reducing release cycles by 30%.",
            "Led integration and system testing of core app components using Postman and JUnit, ensuring high reliability across 10+ features.",
          ]}
        />
        <Experience
          role="Software Developer Analyst"
          org="Terra-Fresh"
          location="Tempe, AZ"
          date="February 2023 – July 2024"
          bullets={[
            "Pioneered ML-driven trend prediction pipelines and automated data scraping on AWS EC2, aggregating 32M+ records from USDA and Google Trends.",
            "Developed APIs with Express.js and Node.js, leveraging PostgreSQL and Kafka for low-latency insights via resilient pipelines.",
            "Managed PostgreSQL and MySQL data layers hosted on AWS RDS, ensuring reliable synchronization for over 1M records.",
          ]}
        />
        <Experience
          role="Undergraduate Research Assistant"
          org="Arizona State University"
          location="Tempe, AZ"
          date="March 2022 – November 2022"
          bullets={[
            "Constructed Python-based simulation tools using PyReason and NetworkX to model supply chain disruptions on the Soc-Pocket dataset (1.6M nodes).",
            "Streamlined data profiling and feature engineering pipelines with Python, Pandas, and Scikit-learn, improving data quality by 35%.",
            "Scripted Spark batch jobs for data cleaning and pre-processing at scale, enabling robust ML experimentation across 5+ pipelines.",
          ]}
        />
        <Experience
          role="Software Engineer"
          org="Bridge-2-Africa: E-Learning Lab"
          location="Tempe, AZ"
          date="January 2022 – May 2022"
          bullets={[
            "Delivered a Django web app with PostgreSQL, optimizing backend logic and DigitalOcean deployment to improve reliability.",
            "Orchestrated CI/CD and testing with Docker and Git, reducing page load latency by 40%.",
          ]}
        />
      </Section>

      {/* Projects */}
      <Section title="PROJECTS">
        <Project
          title="Patient Management System (Microservices)"
          date="February 2025 – March 2025"
          bullets={[
            "Designed and deployed a production-grade system using Spring Boot microservices and Kafka for event-driven communication.",
            "Implemented authentication with Spring Security and JWT; containerized with Docker and provisioned via AWS CloudFormation and GitHub Actions CI/CD.",
          ]}
        />
        <Project
          title="Product Inventory Catalog (Full-Stack System)"
          date="November 2024 – January 2025"
          bullets={[
            "Architected a full-stack inventory and product catalog system with Express.js and PostgreSQL, integrating GraphQL for APIs.",
            "Built a React front end using Apollo Client and GraphQL Codegen with type-safe schemas and strong auth.",
          ]}
        />
        <Project
          title="Order Management System with Go and gRPC"
          date="August 2024 – September 2024"
          bullets={[
            "Constructed distributed microservices in Go using gRPC and Protocol Buffers to simulate end-to-end order and kitchen processing.",
            "Implemented service interfaces with Protobuf and validated gRPC traffic under load to ensure fault-tolerant communication.",
          ]}
        />
      </Section>

      {/* Publications */}
      <Section title="PUBLICATIONS">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Aditya, D., Mukherji, K., Balasubramanian, S., Chaudhary, A., & Shakarian, P. (2023).
            PyReason: Software for Open World Temporal Logic. <em>arXiv</em> (CS.LO).
            <a
              className="underline ml-1"
              href="http://arxiv.org/abs/2302.13482"
              target="_blank"
            >
              arxiv.org/abs/2302.13482
            </a>
          </li>
        </ul>
      </Section>
    </div>
  );
}

/* ---------- Small building blocks ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="text-base font-semibold tracking-wide mb-2">{title}</h3>
      <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-950/40">{children}</div>
    </section>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-1">
      <div className="w-44 shrink-0 text-zinc-300">{label}:</div>
      <div className="flex-1">{value}</div>
    </div>
  );
}

function Row({
  left,
  right,
  sub,
  meta,
}: {
  left: string;
  right?: string;
  sub?: string;
  meta?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
      <div>
        <div className="font-medium">{left}</div>
        {sub && <div className="text-zinc-300">{sub}</div>}
        {meta && <div className="text-zinc-300">{meta}</div>}
      </div>
      {right && <div className="mt-2 md:mt-0 text-zinc-300">{right}</div>}
    </div>
  );
}

function Experience({ role, org, location, date, bullets }: ExperienceItem) {
  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
        <div className="font-medium">
          {role} — {org}
        </div>
        <div className="text-zinc-300">{date}</div>
      </div>
      <div className="text-zinc-300">{location}</div>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Project({ title, date, bullets }: ProjectItem) {
  return (
    <div className="mb-3">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
        <div className="font-medium">{title}</div>
        {date && <div className="text-zinc-300">{date}</div>}
      </div>
      <ul className="list-disc pl-5 space-y-1 mt-2">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
