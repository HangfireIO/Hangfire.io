---
layout: default
title: Hangfire Pricing
active: pricing
redirect_from: /subscriptions/
---

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">
                Plans &amp; Pricing
            </h1>
            <p class="lead" style="margin-bottom: 40px;">
                Hangfire is <strong>completely free</strong> even for commercial use. Subscriptions below allow you to use additional options while ensuring the project will stay here for years to come.
                I provide <strong>30 day</strong> unconditional money back guarantee.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-lg-offset-1-5">
            <div class="plan">
                <div class="plan-title">
                    <h2>Open</h2>
                </div>
                <div class="plan-body">
                    <ul class="plan-items">
                        <li>
                            <a href="/overview.html">Hangfire</a> (under <abbr class="initialism">LGPL</abbr>)
                        </li>
                        <li>Commercial use</li>
                        <li>Documentation</li>
                        <li>Forum support</li>
                        <li class="plan-item-spacer"></li>
                        <li class="plan-item-spacer"></li>
                    </ul>
                    <div class="plan-price">
                        <h3>Free</h3>
                        <h4>Always and Forever</h4>
                    </div>
                    <a class="btn btn-default" href="/downloads.html">Download</a>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="plan">
                <div class="plan-title" style="background-color: #5cb85c;">
                    <h2>Business</h2>
                </div>
                <div class="plan-body">
                    <ul class="plan-items">
                        <li>
                            <a href="/overview.html">Hangfire</a> (under <abbr class="initialism">LGPL</abbr>)
                        </li>
                        <li>
                            <a href="/pro/">Hangfire Pro</a> (under <abbr class="initialism">EULA</abbr>)
                        </li>
                        <li>Documentation</li>
                        <li>Forum support</li>
                        <li>Private e-mail support</li>
                        <li class="plan-item-spacer"></li>
                    </ul>
                    <div class="plan-price">
                        <h3><span class="symbol">$</span>500</h3>
                        <h4>per year</h4>
                    </div>
                    <a class="btn btn-success" href="https://sites.fastspring.com/hangfire/instant/hf-business" target="_top">Buy Now</a>
                </div>
            </div>
        </div>
        <div class="col-sm-3 visible-sm"></div>
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="plan">
                <div class="plan-title" style="background-color: #f0ad4e">
                    <h2>Enterprise</h2>
                </div>
                <div class="plan-body">
                    <ul class="plan-items">
                        <li>
                            <a href="/overview.html">Hangfire</a> (under <abbr class="initialism">EULA</abbr>)
                        </li>
                        <li>
                            <a href="/pro/">Hangfire Pro</a> (under <abbr class="initialism">EULA</abbr>)
                        </li>
                        <li>Documentation</li>
                        <li>Forum support</li>
                        <li>Private e-mail support</li>
                        <li>Priority technical support</li>
                    </ul>
                    <div class="plan-price">
                        <h3><span class="symbol">$</span>5000</h3>
                        <h4>per year</h4>
                    </div>
                    <a class="btn btn-warning" href="https://sites.fastspring.com/hangfire/instant/hf-enterprise" target="_top">Buy Now</a>
                </div>
            </div>
        </div>
    </div>

    <h2 style="margin-bottom: 30px;">Happy Customers</h2>

    <div class="row customers">
        <div class="col-md-4">
            <p>
                <a href="https://www.kcftech.com/" target="_blank" rel="nofollow"><img src="{{ site.cdn }}/img/customers/kcf-tech.png" alt="KCF Technologies"></a>                
            </p>
            <blockquote>
                <p>After years of struggling with developing, deploying and monitoring messy Windows Services, we simply queue up jobs in Hangfire and publish our website!</p>
                <footer><cite title="Source Title">Mark Edwards</cite>, Software Engineering Manager</footer>
            </blockquote>
        </div>
        <div class="col-md-4">
            <p>
                <a href="http://www.rightsline.com/" target="_blank" rel="nofollow"><img src="{{ site.cdn }}/img/customers/rightsline.png" alt="RightsLine"></a>                
            </p>
            <blockquote>
                <p>Hangfire has proven to be a robust approach for managing our scheduled tasks, while giving better visibility into the progress of long running tasks to our developers and end users.</p>
                <footer><cite title="Source Title">Cory Kissinger</cite>, Head of Engineering</footer>
            </blockquote>
        </div>
        <div class="col-md-4">
            <p>
                <a href="http://www.socialsolutions.com/" target="_blank" rel="nofollow"><img src="{{ site.cdn }}/img/customers/social-solutions.png" alt="Social Solutions"></a>                
            </p>
            <blockquote>
                <p>Using Hangfire has allowed us to easily take advantage of the failover and scalability built into a process hosted in IIS.</p>
                <footer><cite title="Source Title">Robert Evans</cite>, Team Lead / Architect</footer>
            </blockquote>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-12 text-center">
            {% for customer in site.data.customers %}
            <a href="{{ customer.url }}" target="_blank" title="{{ customer.title }}">
                <img class="customer-logo" alt="{{ customer.title }}" src="{{ site.cdn }}/img/customers/{{ customer.img }}"></a>
            {% endfor %}
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 text-center">
            ...and 100+ of other companies!
        </div>
    </div>
    
    <h2>Frequently Asked Questions</h2>

    <div class="row">
        <div class="col-md-6">
            <h3>What am I buying?</h3>
            <p>
                Hangfire is an <strong>open-source software</strong> product which is freely available for <a href="/downloads.html">download</a>. It is licensed under the <a href="/licensing.html">LGPL</a> license and you can use it even in commercial and/or properietary applications. Hangfire is fully functional and ready to use.
            </p>

            <p>
                Subscriptions allow you to use <strong>additional functionality</strong> offered by <a href="/pro/">Hangfire Pro</a> extension libraries and contact private <strong>e-mail support</strong>. This is also the way to ensure that Hangfire project will stay here for a long term.
            </p>

            <h3>What payment methods are supported?</h3>
            <p>
                We are accepting <strong>credit cards</strong> <strong>and PayPal</strong>. If you want to purchase Hangfire via bank <strong>wire transfer</strong>, mail/check or purchase order, please contact <a href="mailto:sales@hangfire.io">sales@hangfire.io</a>, and I'll send you the details.
            </p>     

            <h3>What if I am not satisfied?</h3>
            <p>
                All orders are covered by <strong>30-days</strong>, no-questions-asked <strong>money back</strong> policy. If you aren't happy with the software, email <a href="mailto:sales@hangfire.io">sales@hangfire.io</a> and I'll refund the order. I don't want your money if you aren't completely satisfied with the product.
            </p>   

            <h3>What is the buying process?</h3>
            <p>
                Click the <em>Buy Now</em> button and put in your info.  Your license will be associated with the email address you use. You'll receive the latest Hangfire Pro immediately, and I'll generate your credentials for a private NuGet server and email them to you within 24 hours. I can also give you access to the private GitHub repository on your request.
            </p>       

            <h3>How many licenses do I need to buy?</h3>
            <p>
                Each license allows you to embed Hangfire Pro within software that is being developed by one company/organization.
            </p>
        </div>
        <div class="col-md-6">
            <h3>Is this a subscription or a perpetual license?</h3>
            <p>
                <strong>Perpetual, with a yearly maintenance renewal</strong>. You are allowed to use any
                release of Hangfire Pro that was available when you purchased the subscription, as well as any future releases (including new features, bug fixes, etc.) for 1 year from the date of purchase.
            </p>
            <p>
                After that 1 year, you can continue to use the version you have forever, or you can choose to renew your subscription for another 12 months to continue getting updates. By renewing annually, you help me to continue to innovate and add new features to the product.
            </p>
 
            <h3>Which currencies do you accept?</h3>
            <p>
                All prices on this page are in USD, however when you generate a quote or purchase you can choose between USD, AUD, GBP and EUR.
            </p>

            <h3>What if I need to change a subscription?</h3>
            <p>
                Not a problem. Just <a href="mailto:sales@hangfire.io">let me know</a>, and I'll create a custom invoice so that you only pay the difference. You'll never be any worse off.
            </p>
            <p>
                You'll receive a confirmation email upon purchase which can be used as an invoice/receipt.
            </p>

            <h3>Is there a trial version?</h3>
            <p>
                There is no free trial version available for Hangfire Pro. However I do offer a 30 day period with full refund if Pro does not work for you.
            </p>   
            
            <h3>Can I view the EULA?</h3>
            <p>
                Yes, you can read my <a href="/pro/license.html">End User License Agreement</a>.
            </p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <h2>Feature comparison</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-md-10">
            <table class="table table-hover table-striped">
                <colgroup>
                    <col>
                    <col>
                    <col style="background-color: #f5f5f5;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Hangfire</th>
                        <th>Hangfire + Hangfire Pro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Background job processing</th>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Management UI</th>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Support for blazing fast <a href="http://redis.io" target="_blank">Redis</a> storage</th>
                        <td></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Proactive monitoring</th>
                        <td></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Atomic Background Job Creation</th>
                        <td></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Complex Workflows</th>
                        <td></td>
                        <td><i class="glyphicon glyphicon-ok"></i></td>
                    </tr>
                    <tr>
                        <th>Async methods support</th>
                        <td></td>
                        <td><span class="label label-default">Coming later</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
