<?php
$host = 'localhost';
$user = 'u555641943_tcap';
$pass = 'Kw4kN#uqnW.#KJw';
$db   = 'u555641943_tcap';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$base = 'https://tcapitalwealth.com/tcap/uploads/blog_image';

// Image 1: Retirement Plan laptop photo — use as featured image (stored in `image` column)
// Image 2: Growing coins/investment chart — after "When Should You Start?" section
// Image 3: Bonds photo — after Fixed Income Investments section

$details = "<h2>Why Retirement Planning is Important</h2>
<p>Retirement planning ensures you maintain your lifestyle even after your regular income stops. Without proper planning, retirement years may become financially challenging.</p>
<h3>Key Benefits of Retirement Planning</h3>
<ul>
<li>Financial independence after retirement</li>
<li>Protection against inflation</li>
<li>Healthcare expense management</li>
<li>Long-term wealth creation</li>
<li>Peace of mind</li>
</ul>
<h2>When Should You Start?</h2>
<p>The best time to start retirement planning is as early as possible. Early investments benefit from compounding and grow significantly over time.</p>
<ul>
<li><strong>Start at age 25</strong>: Smaller investment, larger corpus</li>
<li><strong>Start at age 40</strong>: Higher investment needed, shorter window</li>
<li><strong>Start at age 50</strong>: Limited growth opportunity, aggressive savings required</li>
</ul>
<p style=\"text-align:center;\"><img src=\"{$base}/blog_img_2_page3.jpg\" alt=\"Smart Investment Growth - Coins growing with plants symbolizing compounding returns\" style=\"max-width:100%;border-radius:10px;margin:20px 0;\" /></p>
<h2>Smart Investment Options for Retirement</h2>
<h3>1. Equity Mutual Funds</h3>
<p>Equity mutual funds are ideal for long-term retirement planning. They offer higher growth potential, professional management, diversified investments, and compounding returns. Young investors should allocate more to equity for better long-term returns.</p>
<h3>2. Fixed Income Investments</h3>
<p>Fixed income investments like bonds, fixed deposits, debt mutual funds, and government securities provide stability and reduce portfolio risk while preserving capital and generating stable income.</p>
<p style=\"text-align:center;\"><img src=\"{$base}/blog_img_3_page4.jpg\" alt=\"Bonds - Fixed Income Investment for Retirement Security\" style=\"max-width:100%;border-radius:10px;margin:20px 0;\" /></p>
<h3>3. Retirement Pension Plans</h3>
<p>Pension plans generate regular income after retirement with predictable cash flow, long-term security, and financial independence.</p>
<h2>Step-by-Step Retirement Planning Strategy</h2>
<ol>
<li><strong>Define Retirement Goals</strong>: Determine retirement age, lifestyle expenses, healthcare needs, and travel goals. Clear goals help estimate the required retirement corpus.</li>
<li><strong>Calculate Retirement Corpus</strong>: Factor in current expenses, inflation rate, life expectancy, and expected investment returns.</li>
<li><strong>Create a Diversified Portfolio</strong>: Include equity investments, mutual funds, fixed income instruments, gold investments, and real estate.</li>
<li><strong>Invest Consistently</strong>: Use SIP investments, retirement funds, and long-term investment strategies. Consistency is key to retirement success.</li>
</ol>
<h2>Common Retirement Planning Mistakes</h2>
<ul>
<li>Delaying retirement planning</li>
<li>Ignoring inflation impact</li>
<li>Lack of portfolio diversification</li>
<li>Investing without clear financial goals</li>
<li>Emotional investing based on market fluctuations</li>
</ul>
<h2>Role of TCapital Wealth in Retirement Planning</h2>
<p>A professional wealth manager helps create a personalized retirement strategy, manage the investment portfolio, optimize returns, reduce risk, and monitor long-term growth. <strong>TCapital Wealth</strong> provides personalized retirement planning strategies based on individual financial goals, ensuring each client builds a secure financial future.</p>
<h2>Benefits of Smart Retirement Investment</h2>
<ul>
<li>Financial independence after retirement</li>
<li>Passive income generation</li>
<li>Wealth preservation and growth</li>
<li>Inflation protection</li>
<li>Peace of mind for the future</li>
</ul>
<h2>Conclusion</h2>
<p>Retirement planning with smart investment is essential for building a secure financial future. Starting early, investing consistently, and following disciplined strategies can help create a strong retirement corpus. With professional guidance from <strong>TCapital Wealth</strong>, individuals can create personalized retirement plans and achieve financial independence after retirement. Start planning today to enjoy a comfortable and stress-free retirement tomorrow.</p>";

// Update blog ID 16 with new details AND set the featured image to image 1
$stmt = $conn->prepare("UPDATE tbl_blog SET details=?, image=? WHERE blog_id=16");
$image_name = 'blog_img_1_page2.jpg';
$stmt->bind_param("ss", $details, $image_name);

if ($stmt->execute()) {
    echo "Blog updated successfully! Rows affected: " . $stmt->affected_rows . "\n";
} else {
    echo "Error: " . $stmt->error . "\n";
}
$stmt->close();
$conn->close();
?>
