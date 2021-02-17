---
layout: post
title: "Machine learning: Accelerating your model deployment&mdash;Part two"
date: 2021-02-19
comments: true
author: Mark McQuade
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U0119UAG3PH-16653531535c-512'
bio: "Mark is an AWS and Cloud-Based Solution Specialist, Knowledge Addict,
Relationship Builder, and Practice Manager of Data Science & Engineering at
Rackspace Onica. His passion is in the data, artificial intelligence, and
machine learning areas. He also loves promoting AWS data and ML services through
webinars and events and passing his knowledge onto others."
published: true
authorIsRacker: true
categories:
    - General
metaTitle: "Machine learning: Accelerating your model deployment&mdash;Part two"
metaDescription: "As machine learning initiatives become more prominent across companies
looking to leverage their data to improve future projections and decision-making, demand
for frameworks that simplify ML model development has been soaring."
ogTitle: "Machine learning: Accelerating your model deployment&mdash;Part two"
ogDescription: "As machine learning initiatives become more prominent across companies
looking to leverage their data to improve future projections and decision-making, demand
for frameworks that simplify ML model development has been soaring."
canonical: https://onica.com/blog/ai-machine-learning/accelerate-ml-deployment-part-2/
slug: "machine-learning-accelerating-your-model-deployment-part-two"

---

As Machine Learning (ML) initiatives become more prominent across companies looking to
leverage their data to improve future projections and decision-making, demand for frameworks
that simplify ML model development has been soaring.

<!--more-->

### Overview

{{<img src="Picture1.png" title="" alt="">}}

In [part 1](https://docs.rackspace.com/blog/machine-learning-accelerating-your-model-deployment-part-one/)
of this series, we looked at the challenges faced in ML model development and deployment
that cause more than 25% of AI and ML initiatives to fail, as noted by
[International Data Corporation](https://www.idc.com/getdoc.jsp?containerId=prUS46534820).
We also discussed some options to improve the speed and ease of ML model development, from
tools such as the [Amazon SageMaker&reg;](https://aws.amazon.com/sagemaker/) stack to the
concept of enhancing operational efficiency across organizations.

In the second part of this series, we take a look at the Rackspace Technology Model Factory
Framework (MLOps) and how it improves efficiency and speed across model development,
deployment, monitoring, and governance.

### End-to-end ML blueprint

As we discussed earlier, a large variety of tools and frameworks exist within the Data
Science and ML universe. ML models flow from data science teams to operational teams when
in development, and these preferential variances can introduce a large amount of lag in the
absence of standardization.

The Rackspace Technology Model Factory Framework provides a model lifecycle management
solution in the form of a modular architectural pattern built by using open source tools
that are platform, tooling, and framework agnostic. Designed to improve the collaboration
between data scientists and operations teams, MLOps can rapidly develop models, automate
packaging, and deploy to multiple environments.

The framework has the following advantages:

- Allows integration with AWS&reg; services and industry-standard automation tools such as
  Jenkins&reg;, Airflow, and Kubeflow.
- Supports various frameworks such as TensorFlow, scikit-learn, Spark ML, spaCy, PyTorch,
  and so on.
- Is deployable into different hosting platforms such as Kubernetes or Amazon SageMaker. 

### Benefits of the Model Factory Framework

The Model Factory Framework provides large efficiency gains, cutting the ML lifecycle from
the average 15+ steps to as few as five. By employing a single source of truth for management,
the framework also automates the handoff process across teams and simplifies maintenance
and troubleshooting.

From the perspective of data scientists, the Model Factory Framework makes their code
standardized and reproducible across environments, enables experiment and training tracking,
and can result in up to 60% of compute cost savings resulting from scripted access to
spot-instance training. For operations teams, the framework offers built-in tools for
diagnostics, performance monitoring, and model-drift mitigation. It also provides a model
registry to track models’ versions over time. Overall, this helps an organization improve
its model deployment time and reduce effort, accelerating the time to business insights
and ROI.

### Framework overview

The Model Factory Framework employs a curated list of Notebook templates and proprietary
domain-specific languages (DSLs), simplifying onboarding, reproduction across environments,
tracking experiments, tuning hyperparameters, and consistently packaging models to the
domain. After you package it, the framework can execute the end-to-end pipeline, which runs
the pre-processing, feature engineering and training jobs, and the log generated metrics
and artifacts. Then, it deploys the model across multiple environments.

#### Development

The Model Factory Framework supports multiple avenues of development. Users can develop
locally, integrate with a Notebooks Server by using Integrated Development Environments
(IDEs), use Sagemaker Notebooks, or even use an automated environment deployment by taking
advantage of AWS&reg; tooling such as AWS CodeStar.

#### Deployment

Amazon supports multiple platform backends for the same model code, and you can deploy
models to Amazon SageMaker, Amazon EMR, Amazon ECS, and Amazon EKS. With these applications,
you can track revision histories, including artifacts and notebooks, with real-time batch
and streaming inference pipelines.

#### Monitoring

You can monitor model requests and responses for detailed analysis, enabling you to address
model and data drift.

#### Governance

The framework clearly separates and controls access to data and model artifacts by using
AWS IAM and bucket policies that govern model feature stores, models, and associated pipeline
artifacts. The framework also supports rule-based access control through Amazon Cognito,
traceability with Data Version Control, and auditing and accounting through extensive tagging.

### Conclusion

To learn more about the features and benefits of the Model Factory Framework from
development to deployment and to understand the model registry component that offers a
centralized view to manage models through their deployment lifecycle, download our
[whitepaper](https://www.rackspace.com/lp/automating-production-level-mlops-aws-whitepaper).

By using a combination of proven accelerators, AWS native tools, and the Model Factory
Framework, companies can experience significant acceleration in model-development automation,
reducing lag and effort and experiencing improvements in time to insights and ROI. If your
organization is interested in using the Model Factory Framework for your ML use cases,
reach out to our [machine learning](https://onica.com/services/ai-machine-learning/)
experts today!

<a class="cta red" id="cta" href="https://www.rackspace.com/data/ai-machine-learning">Learn more about our AI/ML services.</a>

Use the Feedback tab to make any comments or ask questions. You can also click
**Let's Talk** to [start the conversation](https://www.rackspace.com/).
