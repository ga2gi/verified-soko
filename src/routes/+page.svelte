<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Future Self Capsule</title>
    <style>
        :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --text-dark: #1f2937;
            --text-light: #4b5563;
            --bg-accent: #f3f4f6;
            --white: #ffffff;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: var(--text-dark);
            line-height: 1.6;
            margin: 0;
            padding: 0 20px;
        }

        /* Hero Section */
        .hero {
            text-align: center;
            padding: 100px 0 60px;
            max-width: 800px;
            margin: 0 auto;
        }

        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
            margin-bottom: 20px;
            background: linear-gradient(to right, var(--primary), #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 600px;
            margin: 0 auto 40px;
        }

        .cta-button {
            background-color: var(--primary);
            color: var(--white);
            padding: 16px 32px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
            text-decoration: none;
            display: inline-block;
        }

        .cta-button:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
        }

        /* Stats Section */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto 100px;
            background: var(--bg-accent);
            padding: 40px;
            border-radius: 24px;
            text-align: center;
        }

        .stats h2 {
            font-size: 2.5rem;
            margin: 0;
            color: var(--primary);
        }

        .stats p {
            margin: 5px 0 0;
            font-weight: 500;
            color: var(--text-light);
        }

        /* How It Works Section */
        .how {
            max-width: 1100px;
            margin: 0 auto 100px;
            text-align: center;
        }

        .how h2 {
            font-size: 2rem;
            margin-bottom: 50px;
        }

        .steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
        }

        .step-card {
            padding: 40px 30px;
            background: var(--white);
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            transition: box-shadow 0.3s;
        }

        .step-card:hover {
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        .step-number {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            background: var(--bg-accent);
            color: var(--primary);
            border-radius: 50%;
            font-weight: bold;
            margin-bottom: 20px;
        }

        h3 {
            margin-bottom: 15px;
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
            .hero { padding: 60px 0; }
            .stats { padding: 20px; }
        }
    </style>
</head>
<body>

<section class="hero">
    <h1>Send a message to your future self</h1>
    <p>
        Create a personal capsule containing your goals, reflections, and prayers. 
        One day your past self will speak to you again.
    </p>
    <a href="/create" class="cta-button">Create Your Capsule</a>
</section>

<section class="stats">
    <div>
        <h2>400+</h2>
        <p>Capsules created in Kenya</p>
    </div>
    <div>
        <h2>120+</h2>
        <p>Letters delivered</p>
    </div>
</section>

<section class="how">
    <h2>How it works</h2>
    <div class="steps">
        <div class="step-card">
            <span class="step-number">1</span>
            <h3>Write</h3>
            <p>Write a letter to your future self and describe your hopes and dreams.</p>
        </div>
        <div class="step-card">
            <span class="step-number">2</span>
            <h3>Store</h3>
            <p>Your capsule is securely stored until the date you choose.</p>
        </div>
        <div class="step-card">
            <span class="step-number">3</span>
            <h3>Receive</h3>
            <p>When the moment arrives, your past self receives your message.</p>
        </div>
    </div>
</section>

</body>
</html>