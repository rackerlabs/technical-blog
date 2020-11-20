---
layout: post
title: "Predicting customer behavior with amazon sagemaker studio experiments and autopilot"
date: 2020-11-23
comments: true
author: Eric Miller
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010VQY2JLA-47bbb9b85ab3-512'
bio: "Accomplished tech leader, with 20 years of career success in Enterprise IT. Provides strategic consulting leadership with a proven track record of practice building in the Amazon Partner Network (APN) ecosystem." 
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Predicting customer behavior with amazon sagemaker studio experiments and autopilot"
metaDescription: "Amazon SageMaker Studio is a web-based, fully integrated development environment (IDE) for machine learning on AWS."
ogTitle: "Predicting customer behavior with amazon sagemaker studio experiments and autopilot"
ogDescription: "Amazon SageMaker Studio is a web-based, fully integrated development environment (IDE) for machine learning on AWS."
slug: "predicting-customer-behavior-with-amazon-sagemaker-studio-experiments-and-autopilot"
canonical: https://onica.com/blog/ai-machine-learning/predicting-customer-behavior-with-amazon-sagemaker-studio-experiments-and-autopilot/

---

*Originally published in April 2020, at Onica.com/blog*

Amazon SageMaker Studio&reg; is a web-based, fully integrated development environment (IDE) for machine learning on AWS. Amazon&reg; announced Amazon SageMaker Studio at **re:Invent** in 2019, SageMaker Studio aims to roll up a number of core SageMaker features. 

<!--more-->

### SageMaker Studio's features in a nutshell

+ SageMaker Studio Notebooks &mdash;with a substantially overhauled UI look and feel
+ Amazon SageMaker Autopilot
+ Amazon SageMaker Experiments
+ Amazon SageMaker Debugger
+ Amazon SageMaker Model Monitor

In this post, we’re going to take a closer look at the first three preceding features, test drive them against some data, and get a sense of what SageMaker Studio might do to help solve a real business problem.

#### Enable SageMaker Studio

In order to use SageMaker Studio, it first needs to be enabled in your AWS account. It is currently available in US East 2 (Ohio) AWS region, with additional regions coming soon. To start using SageMaker Studio:

1. Log in to the web console for your AWS account.
2. Navigate to the Ohio (us-east-2) region.
3. Navigate to the SageMaker dashboard, and click **SageMaker Studio** in the upper left.
4. Choose **create new**, accept the defaults, and click **Submit**. During the setup process, you must create an `IAM` role.

{{<img src="picture1.png" title="" alt="">}}

5. Click **Open Studio** to begin. After just a few moments, SM studio will be ready for use. 

{{<img src="picture2.png" title="" alt="">}}

#### Automated Notebook instance provisioning

[Notebooks](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi.html) is a feature of SageMaker that allows a user to provision [Jupyter Notebook](https://jupyter.org/) instances to use for data exploration and experimentation. If you’ve used SageMaker Notebooks previously, the first thing you will notice is SageMaker Studio eliminates the need to manually provision a Jupyter notebook instance. When a user clicks **Open Studio** from the console, SageMaker Studio takes care of provisioning a notebook instance behind the scenes, which is very convenient.

#### Not your usual Jupyter UI!

Upon first use, Jupyter users will immediately notice the SageMaker Studio team has invested a great deal of effort into improving the standard Jupyter UI. The Studio UI features a very nice default dark appearance, an integrated file browser, and top and side nav menus that make it look and feel like a real, first class IDE. Also, there is a **Launcher tab** for executing common tasks, like launching a new notebook or opening a terminal session. Jupyter is a significant upgrade over the default Jupyter experience.

{{<img src="picture3.png" title="" alt="">}}

#### SageMaker Studio: Experiments and AutoPilot

Clicking around the Studio console, the first thing that caught our attention was “Experiments”. **Amazon SageMaker Studio Experiments** allows users to organize, track, compare, and evaluate machine learning experiments. As part of an iterative process, Amazon SageMaker Experiments automatically tracks the inputs, parameters, configurations, and results of your iterations as trials. You can assign, group, and organize these trials into experiments. Experiments integrates with the IDE, providing a visual interface to browse your active and past experiments, compare trials on key performance metrics, and identify the best performing models.

Under the hood of **SageMaker Studio Experiments** is [SageMaker AutoPilot](https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html), which is AWS’ implementation of [AutoML](https://en.wikipedia.org/wiki/Automated_machine_learning). **AutoPilot** simplifies the machine learning process by helping users explore data, try different algorithms, automatically trains and tunes models, and identifies the best algorithm. Autopilot uses automation to explore different combinations of data preprocessors, algorithms, and algorithm parameter settings to find an accurate model, similar to how a data scientist would.

#### A real world problem: Predicting customer behavior with SageMaker Studio

When trying out a new AWS tool like SageMaker Studio, the [Getting Started documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-studio.html) that AWS provides is a good place to begin, before moving on to something more complex. However, in this case, since we are discussing what is essentially an AutoML tool, we thought it might be more interesting and entertaining to put Studio through the tests on a real world data set that maybe doesn’t ‘play nicely’ out of the box like the Getting Started docs will. This should give us a better idea of how Studio Experiments might perform in the wild, when using data that is closer to what a real customer problem would look like.

Hopping over to [kaggle](kaggle.com), I decided on the Santander Customer Transaction Prediction data set. Santander is a financial institution, who wanted to identify which banking customers will make a specific transaction in the future, irrespective of the amount of money transacted. The data provided in this data set has the same structure as the real data that the company has available to solve this problem.

#### The data

The data set consists of 200,000 training samples, with each sample containing about 200 anonymized numeric feature variables. Each sample is labelled with a binary target variable that indicates whether or not the customer made the specific interesting ‘future transaction’ that Santander would like to predict. A test set is also provided, also with 200,000 samples but without any labels. The task is to predict the value of the target column in the test set.

Without doing any EDA in a notebook, the first thing that jumps out is the count of positive data samples is only 20,098, so roughly ~10% of the training data. We’ll make a note of that, as that class imbalance may influence how we decide to use SageMaker Studio later on in our process.

{{<img src="picture4.png" title="" alt="">}}

#### Obtaining the data and uploading to Amazon S3

First, we’ll need to get the Santander customer data into SageMaker Studio. We could download the data as a zipfile to our local workstation, and then re-upload it to our Studio instance. Or, we could use the Kaggle CLI to download the data directly into Studio. The Internet in my house is currently in high demand due to a house full of COVID-quarantined kids accessing school video classes, so I’m going to use the CLI. To follow along, you’ll need a Kaggle account, and a kaggle.json, which you can get by clicking “Create New API Token” on your account settings page. If you prefer to skip this step, you can simply download the data as a zipfile, and re-upload it to Studio, but be warned that it is 250MB, so the re-upload may take a while depending on your connection.

If you’d like to follow along in your own SageMaker Studio, all the code for this project is available as a GitHub repo [here](https://github.com/ezeeetm/Sagemaker-Studio-Santander-Customer-Transaction.git), so let’s grab that now and put it on our SageMaker Studio instance.

In your SageMaker Studio IDE, choose Terminal from the Launcher tab, and clone the repository linked above. Then, in the file browser on the left hand side of the Studio IDE, browse into the root directory of the repo and upload your `kaggle.json` API key.

{{<img src="picture5.png" title="" alt="">}}

{{<img src="picture6.png" title="" alt="">}}

{{<img src="picture7.png" title="" alt="">}}

Next, double click the `sagemaker_studio.ipynb` to open the notebook in the IDE. This should open a new Jupyter notebook tab, with all the code required for the rest of this walkthrough. Go ahead and use `SHIFT+ENTER` to execute the first two code cells in the notebook. These will install the Kaggle command line (CLI), then download and unzip the Santander customer data on the SageMaker Studio instance.

{{<img src="picture8.png" title="" alt="">}}

{{<img src="picture9.png" title="" alt="">}}

Then, execute the next code cell to take a quick look at the data in `train.csv`

{{<img src="picture10.png" title="" alt="">}}

Notice that the `ID_code` value is neither a feature nor the target variable, so let’s drop the `ID_code` column, and overwrite train.csv with this new format. The original file is still in the `.zip` if we mess something up and need it later. It’s possible that the **AutoML** features of **SageMaker AutoPilot** would learn to ignore or otherwise handle this extra column appropriately. But, it seems like removing it is the most objective choice, since we know it’s not correlated with the target feature in any way, nor will those ID values be equivalent in the test data.

{{<img src="picture11.png" title="" alt="">}}

{{<img src="picture12.png" title="" alt="">}}

Finally, let’s create a throwaway bucket and upload our `train.csv` file to S3, so that we can use it to create an Experiment in SageMaker Studio! Be sure to copy the bucket name you generated, so we can use it later when setting up our Experiment.

{{<img src="picture13.png" title="" alt="">}}

#### Create a new SageMaker Experiment

Now, we have everything we need to create an Experiment with our data set. Locate the Experiments beaker icon in the left navigation pane, and click **Create Experiment**. Then configure your Experiment with:

1. Include an **Experiment** name, and copy it. The name should be similar to this: `s3://smstudio-santander-123456789/train.csv`
2. Include the **S3** location of input data. This is the path to your `/train.csv` file in **S3**.
3. Enter the **Target attribute** name in the target column in our dataset.
4. Locate the **S3** location for output data. This is where the Experiment stores trial results and models. Again, just append an `/output` path the throwaway bucket we created in the previous step, it should be similar to this: `s3://smstudio-santander-123456789/output`
5. Select the **machine learning problem type**. You should choose `binary classification` not `Auto`, due to the nature of our problem. 
6. Select  **Accuracy** as the **objective metric**.
7. Click **Yes** to run a complete experiment. 
8. Click **Create Experiment** located at the bottom right corner of the `IDE`.

**Note:** During step seven, choose **No** and you will cause the Experiments process to only run the Data Analysis portion of the Experiments pipeline. This produces two representative Jupyter notebooks, but omits feature engineering, model training, or hyperparameter tuning jobs.

{{<img src="picture14.png" title="" alt="">}}

A quick note **Accuracy**. SageMaker Studio gives us two choices for binary classification problems: **Accuracy** and **F1**. When to use each depends largely on the class balance in the training data set, and/or our expectation of false positives/negatives during training. Recall earlier that our classes are somewhat imbalanced: ~90% negative, ~10% positive.

**Accuracy** is often a good choice in cases where there is a more balanced distribution of classes. **F1**, on the other hand may be a better choice when there is a substantial class imbalance. You can  interpreted the **F1 score** as a weighted average of the precision and recall, where an F1 score reaches its best value at *1* and worst score at *0*. The contribution of precision and recall to the F1 score are equal. The formula for the F1 score is:

    F1 = 2 * (precision * recall) / (precision + recall)

**Precision** and **Recall** scores are effective in cases where class imbalance is so great that false positives and negatives become a problem for training. Consider an example of credit card fraud, where a hypothetical **99.5%** of transactions are not fraudulent. A model could be trained that seems to do very well when **Accuracy** is used, and easily yield a **99.5%** accurate result. However that same model can get the **.5%** fraudulent transactions wrong, **100%** of the time (false negatives), and essentially be non-predictive in any way, while still scoring **99.5%** accuracy. Imbalanced data sets like that are where **Precision**, **Recall**, and **F1** can be an effective objective metric to train on false positives/false negatives instead of just raw accuracy.

So, why then are we choosing **Accuracy** here as our Objective Metric for imbalanced data set? A few reasons:

+ **90/10** might not be enough imbalance to make an **Accuracy** scored model appear to do well even when it’s not. That is, a 99% score on a 99/1 imbalance looks deceptively great, but a 90% score on a 90/10 imbalance does not.
+ Two choices for Objective metric exist here, **Accuracy** and **F1**, we can easily just run an Experiment with both, and just pick the one that performs the best against a test set that neither model has ever seen.
+ The **AutoML** features of SageMaker Studio should work well independent of what settings the user chooses.

There are well-researched methods for dealing with class imbalance in training data. These methods include **random oversampling** of the minority class, random undersampling of the majority class, or ‘sample engineering’ using methods like Synthetic Minority Oversampling Technique(SMOTE), which uses a nearest neighbors algorithm to generate new synthetic data. However, again, we are testing AutoML features here, so any additional pre-processing we apply sort of dilutes the value we expect to see from the ‘automated’ part of AutoPilot’s AutoML capabilities. So, we’ll intentionally skip any preprocessing here, in favor of letting AutoPilot show us what it can do!

### SageMaker Experiments Workflow

So, what exactly is SageMaker Studio doing under the hood when we run an Experiment? Well, there are four phases to the Experiment, let’s unpack in detail what each one is doing.

{{<img src="picture15.png" title="" alt="">}}

#### Analyzing Data

First, SageMaker Studio will do some automated Exploratory Data Analysis (EDA), and produce two artifacts: a candidate generation notebook and a data exploration notebook. First, the data exploration notebook:

+ Does some high level analysis of things like missing values, such as: nan, white spaces, empty fields, etc.
+ Assesses number of unique values to determine whether to treat a feature as Categorical or Text and then processes the feature according to its type.
+ For Numerical features, applies numerical transformations such as normalization, log and quantile transforms, and binning to manage outlier values and difference in feature scales. For our Santander data set, this is the most relevant as SageMaker Studio finds 201 of the 202 columns contained at least one numerical value. All features are numerical, with the exception of the target feature, which is a category.
+ Takes all of that, captures it in a Jupyter notebook for future ‘explainability’ reference, and moves on to candidate generation.

{{<img src="picture16.png" title="" alt="">}}

{{<img src="picture17.png" title="" alt="">}}

Next, based on what it learned during the Data Exploration phase, SageMaker Studio produces a Candidate Generation notebook. This notebook:

+ Helps you inspect and modify the data transformation approaches proposed by Amazon SageMaker Autopilot. You can interactively train the data transformation models and use them to transform the data. Finally, you can execute a multiple algorithm hyperparameter optimization (multi-algo HPO) job that helps you find the best model for your dataset by jointly optimizing the data transformations and machine learning algorithms. This is all done automatically when “run a complete experiment” was set to Yes when configuring the experiment.
+ Most importantly, lists all the models that AutoPilot intends to evaluate, which we will unpack in detail in the following section.

### SageMaker AutoPilot models: a closer look

A SageMaker AutoPilot model candidate consists of two fundamental components: a preprocessor and an algorithm. The preprocessor defines a data transformation strategy, and the algorithm determines which specific ML approach will be used for that model candidate. Both the preprocessor and the algorithm have configurable hyperparameters that change the way the component works. These hyperparameters will be optimized later in the Experiment process as part of an automated hyperparameter tuning job.

In our example with the Santander customer transaction data, AutoPilot identified several model candidates for evaluation. Let’s take a detailed look at one of the candidates below. In this case, the data preprocessor (dpp) is dpp0, and the algorithm is xgboost. Together they make candidate definition ‘dpp0-xgboost‘

dpp0-xgboost: This data transformation strategy first transforms ‘numeric’ features using RobustImputer (converts missing values to nan), ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustStandardScaler. The transformed data will be used to tune a xgboost model.

All told, AutoPilot suggested 10 different preprocessing candidates, paired with 3 linear algorithms and 7 xgboost algorithms. (Any bets on which one is going to win?). I’ve included the remaining 9 model candidates as an appendix(1) at the end of this blog, for those who may be interested, so you can get a general idea of how they might differ from one candidate to the next. Here’s what an individual model definition looks like in the candidate selection notebook:

{{<img src="picture18.png" title="" alt="">}}

#### Feature Engineering and Model Tuning

Next, SageMaker Experiments essentially does an automated run of what is described on the “Candidate Selection” notebook. That is, it:

+ Executes the Candidate Pipelines
+ Run Data Transformation Steps, and any feature engineering included in the preprocessor (see examples above and appendix(1) for more). These are built on SciKit Learn, and maintained here: https://github.com/aws/sagemaker-scikit-learn-extension
+ Conducts Multi Algorithm Hyperparameter Tuning, across 250 different combinations of hyperparameters. The default value of 250 is configurable.
+ Identifies the best model candidate

#### Training results: 91.4% accuracy!

The entire Experiments/AutoPilot process completed in a little under 3 hours. During that time, however, the actual training duration was a little under 16 hours due to parallelization of the HPO job in what appeared to be about 10 jobs wide. 16 hours worth of training in under 3 hours is not bad at all!

As for our accuracy objective metric, the best candidate achieved a score of 91.4% accuracy. This is a very promising first result, considering all we really did was remove an ID column from our data, upload it to S3, provide some very basic configuration values for the Experiment, then grab a cup of coffee and come back 3 hours later.

{{<img src="picture19.png" title="" alt="">}}

So, what made this particular candidate so special compared to the other 249 candidates that were evaluated? Well, the model used the dpp1 preprocessor which is a stack of RobustImputer and RobustMissingIndicator followed by LogExtremeValuesTransformer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. You can learn more about those processors here: https://github.com/aws/sagemaker-scikit-learn-extension. It then trains a linear learner algorithm, with the specific hyperparameters shown below:

{{<img src="picture20.png" title="" alt="">}}

### What’s next?
91% training accuracy is a great starting point considering it only took a few minutes of manual effort to get to that point. There are a few things we can do next to start improving on that baseline accuracy score:

+ Most importantly, we need to evaluate our best candidate against a previously unseen test set of unlabeled data, to ensure our model didn’t overfit to our training data. SageMaker does automatically break the data up into a train/validate split during training, but it’s still possible for a model to overfit to a validation set during training. For this, we can use the unlabeled test.csv data that accompanied our training data, and deploy our model using SageMaker Batch Transform. Batch Transform can do batch inference of data in S3. This approach avoids having to deploy a SageMaker endpoint and call it 200,000 times, line by line, to evaluate the test data.
+ Once we have inferred labels on the test.csv data, we can submit it to the Kaggle leaderboard, to see how our model fares against 8,802 teams of humans, the best of which scored 92.5% against the data in test.csv.
+ We can also do some basic data resampling/oversampling/synthesizing to reduce the imbalance in our training data.
+ Finally, we could run a second Experiment using F1 score instead of Accuracy, and see how the best candidate from that Experiment fares against the unlabeled test.csv data.

#### Conclusion

I hope you enjoyed this walkthrough of training an ML model using SageMaker Studio Experiments and AutoPilot. I was personally surprised by a few things in writing this:

First, how easy it was to set up and use SageMaker Experiments. It really was a breeze to go from 0 to trained model, and didn’t run into any snags or hand waving that isn’t covered in this article.

Second, the training accuracy of the best candidate, which I fully expected to be very bad for AutoML used against an imbalanced classification problem with no preprocessing to address the imbalance.

Third, that the ‘winning’ model had a “text features using MultiColumnTfidfVectorizer” element to it. This is essentially useless in this use case as there are no text features, but it does speak to the effectiveness of the other elements of the preprocessing stack, and the best hyperparameters of the candidate model. I’d like to look at an intermediate dataset to see how (if at all) the MultiColumnTfidfVectorizer transforms the training data, since there is no text data to calculate Term Frequency or Document Frequency. It’s interesting that this preprocessing element was even in a candidate, let alone that it did so well.

Finally, I was most surprised that the linear model was able to outperform XGBoost in training. I fully expected one of the XGBoost models to come out on top, and do so by a large margin. Perhaps with more preprocessing and more experimentation, it would!

Are you exploring Machine Learning to extract intelligence from your data and empower business decision-making? Get in touch with our AI/ML experts today and discover how Onica can help you develop an AWS powered solution.

**(1) Appendix**: AutoPilot Model Definitions Chosen for Santander dataset

**dpp1-linear-learner**: This data transformation strategy first transforms ‘numeric’ features using combined RobustImputer and RobustMissingIndicator followed by LogExtremeValuesTransformer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a linear-learner model.

**dpp2-xgboost**: This data transformation strategy first transforms ‘numeric’ features using RobustImputer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a xgboost model.

**dpp3-xgboost**: This data transformation strategy first transforms ‘numeric’ features using RobustImputer (converts missing values to nan), ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustStandardScaler. The transformed data will be used to tune a xgboost model.

**dpp4-linear-learner**: This data transformation strategy first transforms ‘numeric’ features using combined RobustImputer and RobustMissingIndicator followed by QuantileExtremeValuesTransformer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a linear-learner model.

**dpp5-xgboost**: This data transformation strategy first transforms ‘numeric’ features using RobustImputer (converts missing values to nan), ‘categorical’ features using ThresholdOneHotEncoder, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustStandardScaler. The transformed data will be used to tune a xgboost model.

**dpp6-xgboost**: This data transformation strategy first transforms ‘numeric’ features using RobustImputer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a xgboost model.

**dpp7-xgboost**: This data transformation strategy first transforms ‘numeric’ features using RobustImputer (converts missing values to nan), ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustStandardScaler. The transformed data will be used to tune a xgboost model

**dpp8-linear-learner**: This data transformation strategy first transforms ‘numeric’ features using combined RobustImputer and RobustMissingIndicator followed by QuantileExtremeValuesTransformer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a linear-learner model.

**dpp9-xgboost**: This data transformation strategy first transforms ‘numeric’ features using combined RobustImputer and RobustMissingIndicator followed by QuantileExtremeValuesTransformer, ‘text’ features using MultiColumnTfidfVectorizer. It merges all the generated features and applies RobustPCA followed by RobustStandardScaler. The transformed data will be used to tune a xgboost model.

