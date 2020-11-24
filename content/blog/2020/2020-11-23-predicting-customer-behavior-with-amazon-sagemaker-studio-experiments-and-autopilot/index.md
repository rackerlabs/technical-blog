---
layout: post
title: "Predicting customer behavior with Amazon SageMaker Studio experiments and Autopilot"
date: 2020-11-23
comments: true
author: Eric Miller
authorAvatar: 'https://ca.slack-edge.com/T07TWTBTP-U010VQY2JLA-47bbb9b85ab3-512'
bio: "Accomplished tech leader, with 20 years of career success in Enterprise IT. Provides strategic consulting leadership with a proven track record of practice building in the Amazon Partner Network (APN) ecosystem." 
published: true
authorIsRacker: true
categories:
    - AWS
metaTitle: "Predicting customer behavior with Amazon SageMaker Studio experiments and Autopilot"
metaDescription: "Amazon SageMaker Studio is a web-based, fully integrated development environment (IDE) for machine learning on AWS."
ogTitle: "Predicting customer behavior with Amazon SageMaker Studio experiments and Autopilot"
ogDescription: "Amazon SageMaker Studio is a web-based, fully integrated development environment (IDE) for machine learning on AWS."
slug: "predicting-customer-behavior-with-amazon-sagemaker-studio-experiments-and-autopilot"
canonical: https://onica.com/blog/ai-machine-learning/predicting-customer-behavior-with-amazon-sagemaker-studio-experiments-and-autopilot/

---

*Originally published in April 2020, at Onica.com/blog*

Amazon SageMaker Studio&reg; is a web-based, fully integrated development environment (IDE) for machine learning on AWS&reg;.
SageMaker Studio, which Amazon&reg; announced at **re:Invent** in 2019, aims to roll up several core SageMaker features. 

<!--more-->

### SageMaker Studio features in a nutshell

+ SageMaker Studio Notebooks with a substantially overhauled UI look and feel
+ Amazon SageMaker Autopilot
+ Amazon SageMaker Experiments
+ Amazon SageMaker Debugger
+ Amazon SageMaker Model Monitor

This post takes a closer look at the first three features, test drives them against some data, and shares how
SageMaker Studio might help solve a real business problem.

### Enable SageMaker Studio

To use SageMaker Studio, enable it in your AWS account. It is currently available in US East 2 (Ohio) AWS region, with additional
regions coming soon. To start using SageMaker Studio, perform the following steps:

1. Log in to the web console for your AWS account.
2. Navigate to the Ohio (us-east-2) region.
3. Navigate to the SageMaker dashboard and click **SageMaker Studio** in the upper-left corner.
4. Choose **create new**, accept the defaults, and click **Submit**. During the setup process, you must create an `IAM` role.

{{<img src="picture1.png" title="" alt="">}}

5. Click **Open Studio** to begin.

{{<img src="picture2.png" title="" alt="">}}

### Automated Notebook instance provisioning

The [Notebooks](https://docs.aws.amazon.com/sagemaker/latest/dg/nbi.html) feature of SageMaker allows users
to provision [Jupyter Notebook](https://jupyter.org/) instances to use for data exploration and experimentation. If
you’ve used SageMaker Notebooks previously, notice that SageMaker Studio eliminates the need to provision a Jupyter
notebook instance manually. When a user clicks **Open Studio** from the console, SageMaker Studio takes care of
provisioning a notebook instance behind the scenes, which is very convenient.

### Not your usual Jupyter UI

Upon first use, Jupyter users immediately notice the SageMaker Studio team invested a great deal of effort to improve
the standard Jupyter UI. The Studio UI features a very nice default dark appearance, an integrated file browser, and top
and side navigation menus that make it look and feel like a real IDE. Also, there is a **Launcher tab** for executing common
tasks, like launching a new notebook or opening a terminal session. Jupyter is a significant upgrade over the default Jupyter
experience.

{{<img src="picture3.png" title="" alt="">}}

### SageMaker Studio: Experiments and AutoPilot

Clicking around the Studio console, the first thing that caught our attention was *Amazon SageMaker Studio Experiments*. This
tool allows users to organize, track, compare, and evaluate machine learning experiments. As part of an iterative process,
SageMaker Experiments automatically tracks the inputs, parameters, configurations, and results of your iterations as trials.
You can assign, group, and organize these trials into experiments. Experiments integrates with the IDE, providing a visual
interface to browse your active and past experiments, compare trials on key performance metrics, and identify the best performing models.

Under the hood of **SageMaker Studio Experiments** is 
[SageMaker AutoPilot](https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html),
which is the AWS implementation of [AutoML](https://en.wikipedia.org/wiki/Automated_machine_learning). AutoPilot simplifies the
machine learning process by:

- Helping users explore data and try different algorithms
- Automatically training and tuning models
- Identifing the best algorithm. 

Autopilot uses automation to explore different combinations of data preprocessors, algorithms, and algorithm parameter settings
to find an accurate model, similar to how a data scientist would.

### A real-world problem: Predicting customer behavior with SageMaker Studio

When you try out a new AWS tool like SageMaker Studio, the [Getting Started documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-studio.html)
that AWS provides is a good place to begin before moving on to something more complex. However, because we are discussing what is
essentially an AutoML tool, we thought it might be more interesting and entertaining to put Studio through the tests on a real-world
data set that maybe doesn’t *play nicely* out-of-the-box like the **Getting Started docs** describe. This should give us a better idea
of how Studio Experiments might perform in the wild when using data that is closer to how real customer problems look.

Hopping over to [kaggle](kaggle.com), we decided on the *Santander&reg; Customer Transaction Prediction data set*. Santander is a
financial institution, that wanted to identify which banking customers would make a specific transaction in the future, irrespective
of the amount of money transacted. The data in this data set has the same structure as the real data that the company has.

#### The data

The data set consists of 200,000 training samples, with each sample containing about 200 anonymized numeric feature variables. Each sample
has a binary target variable indicating whether the customer made the specific interesting *future transaction* that Santander wants to
predict. A test set is also available, also with 200,000 samples but no labels. The task is to predict the value of the target column in
the test set.

Without doing any Exploratory Data Analysis (EDA) in a notebook, the first thing that jumps out is the count of positive data samples is
only 20,098, so roughly 10% of the training data. That's important because that class imbalance might influence how we decide to use
SageMaker Studio later on in our process.

{{<img src="picture4.png" title="" alt="">}}

#### Obtaining the data and uploading to Amazon S3

First, we need to get the Santander customer data into SageMaker Studio. We could download the data as a zipped file to your local
workstation and then re-upload it to your Studio instance or use the Kaggle CLI to download the data directly into Studio. To follow along,
you need a **Kaggle** account and a **kaggle.json** file, which you can get by clicking **Create New API Token** on your account settings
page. If you prefer to skip this step, you can simply download the data as a zip file and re-upload it to Studio. Be warned that it is
250 MB, so the re-upload may take a while depending on your connection.

If you want to follow along in your own SageMaker Studio, all the code for this project is available as a
[GitHub repo](https://github.com/ezeeetm/Sagemaker-Studio-Santander-Customer-Transaction.git). Grab that and put it on your
SageMaker Studio instance.

In your SageMaker Studio IDE, choose **Terminal** from the **Launcher** tab, and clone the repository linked previously. Then, in the
file browser on the left-hand side of the Studio IDE, browse into the root directory of the repo and upload your `kaggle.json` API key.

{{<img src="picture5.png" title="" alt="">}}

{{<img src="picture6.png" title="" alt="">}}

{{<img src="picture7.png" title="" alt="">}}

Next, double click **sagemaker_studio.ipynb** to open the notebook in the IDE. This should open a new Jupyter notebook tab, with all the
code necessary for the rest of this walkthrough. Go ahead and use **Shift+Enter** to execute the first two code cells in the notebook.
These install the Kaggle command line (CLI) and download and unzip the Santander customer data on the SageMaker Studio instance.

{{<img src="picture8.png" title="" alt="">}}

{{<img src="picture9.png" title="" alt="">}}

Then, execute the next code cell to take a quick look at the data in **train.csv**.

{{<img src="picture10.png" title="" alt="">}}

Notice that the **ID_code** value is neither a feature nor the target variable, so drop the **ID_code** column and overwrite **train.csv**
with this new format. The original file is still in the zipped archive in case we mess something up and need it later. It’s possible that the
AutoML features of SageMaker AutoPilot can ignore or otherwise handle this extra column appropriately. However, removing it is the most
objective choice because we know it’s not correlated with the target feature in any way. Also, those ID values aren't equivalent in the
test data.

{{<img src="picture11.png" title="" alt="">}}

{{<img src="picture12.png" title="" alt="">}}

Finally, create a throwaway bucket and upload the **train.csv** file to AWS S3 so that you can use it to create an experiment in SageMaker
Studio. Be sure to copy the bucket name you generated so you can use it later when setting up the experiment.

{{<img src="picture13.png" title="" alt="">}}

### Create a new SageMaker experiment

Now, we have everything we need to create an Experiment with our data set. Locate the experiment's beaker icon in the left navigation pane
and click **Create Experiment**. Then, perform the following steps to configure your experiment:

1. Include an **Experiment** name and copy it. The name should be similar to this: **s3://smstudio-santander-123456789/train.csv**
2. Include the **S3** location of input data. This is the path to your **/train.csv** file in S3.
3. Enter the **Target attribute** name in the target column in our dataset.
4. Find the **S3** location for output data. This is where the experiment stores trial results and models. Again, just append the 
   **/output** path to the throwaway bucket you created in the previous step. It should be similar to this: **s3://smstudio-santander-123456789/output**
5. Select the **machine learning problem type**. You should choose `binary classification`, not `Auto`, due to the nature of our problem. 
6. Select  **Accuracy** as the **objective metric**.
7. Click **Yes** to run a complete experiment. 
8. Click **Create Experiment** at the bottom-right corner of the `IDE`.

**Note:** During step seven, if you choose **No**, the Experiments process runs only the **Data Analysis** portion of the experiment pipeline.
This produces two representative Jupyter notebooks but omits feature engineering, model training, or hyperparameter tuning jobs.

{{<img src="picture14.png" title="" alt="">}}

A quick note about *Accuracy*. SageMaker Studio gives us two choices for binary classification problems: **Accuracy** and **F1**.
Using each depends largely on the class balance in the training data set and our expectation of false positives or negatives during
training. Remember our classes are somewhat imbalanced: ~90% negative, ~10% positive.

**Accuracy** is often a good choice in cases where there is a more balanced distribution of classes. **F1**, on the other hand, might be
a better choice when there is a substantial class imbalance. You can interpret the **F1 score** as a weighted average of the precision
and recall, where an F1 score reaches its best value at *1* and worst score at *0*. The contribution of precision and recall to the F1
score are equal. The formula for the F1 score is:

    F1 = 2 * (precision * recall) / (precision + recall)

Precision and Recall scores are effective when class imbalance is so great that false positives and negatives become a problem for training.
Consider an example of credit card fraud, where a hypothetical 99.5% of transactions are not fraudulent. A model could be trained that
seems to do very well when *Accuracy* is used and easily yields a 99.5% accurate result. However, that same model can get the .5% fraudulent
transactions wrong (100% of the time  with false negatives) and essentially be non-predictive in any way while still scoring 99.5% accuracy.
Imbalanced data sets like that are where Precision, Recall, and F1 are an effective objective metric to train on false positives or
false negatives instead of just raw accuracy.

So, why then are we choosing Accuracy here as our objective metric for an imbalanced data set? A few reasons:

+ **90/10** might not be enough imbalance, which makes an Accuracy-scored model appear to do well even when it’s not. That is, a 99% score
  on a 99/1 imbalance looks deceptively great, but a 90% score on a 90/10 imbalance does not.
+ Two choices for the **Objective** metric exist here, Accuracy and F1. We can easily just run an experiment with both and just pick the one
  that performs the best against a test set that neither model has ever seen.
+ The **AutoML** features of SageMaker Studio should work well independent of what settings the user chooses.

There are well-researched methods for dealing with class imbalance in training data. These methods include *random oversampling* of the
minority class, *random undersampling* of the majority class, or *sample engineering* by using methods similar to the *Synthetic Minority
Oversampling Technique* (SMOTE), which uses a nearest-neighbors algorithm to generate new synthetic data. However, again, we are testing
AutoML features here, so any additional preprocessing we apply dilutes the value we expect to see from the automated part of AutoPilot’s
AutoML capabilities. So, we intentionally skip any preprocessing here in favor of letting AutoPilot show us what it can do.

### SageMaker Experiments workflow

So, what exactly is SageMaker Studio doing under the hood when we run an experiment? Well, there are four phases to the Experiment, so
let’s unpack in detail what each one is doing.

{{<img src="picture15.png" title="" alt="">}}

#### Analyzing data

First, SageMaker Studio does some automated **Exploratory Data Analysis** (EDA) and produces two artifacts: a candidate generation
notebook and a data exploration notebook. 

The data exploration notebook:

+ Does some high-level analysis of things like missing values, such as nan, white spaces, empty fields, and so on.
+ Assesses a number of unique values to determine whether to treat a feature as *Categorical* or *Text* and then
  processes the feature according to its type.
+ Applies numerical transformations such as normalization, log, and quantile transforms and binning to manage outlier
  values and differences in feature scales. This is the most relevant for our Santander data set because SageMaker Studio
  finds 201 of the 202 columns contained at least one numerical value. All features are numerical, except the target feature,
  which is a category.
+ Takes all of that, captures it in a Jupyter notebook for future *explainability* reference, and moves on to candidate generation.

{{<img src="picture16.png" title="" alt="">}}

{{<img src="picture17.png" title="" alt="">}}

Based on what it learned during the Data Exploration phase, SageMaker Studio produces a candidate generation notebook:

+ Helps you inspect and modify the data transformation approaches proposed by Amazon SageMaker Autopilot. You can interactively
  train the data transformation models and use them to transform the data. Finally, you can execute a multiple algorithm hyperparameter
  optimization (multi-algo HPO) job that helps you find the best model for your dataset by jointly optimizing the data transformations
  and machine learning algorithms. We do this automatically when **run a complete experiment** is set to **Yes** when configuring the
  experiment.
+ Most importantly, lists all the models that AutoPilot intends to evaluate, which the following section explores.

#### SageMaker AutoPilot models: a closer look

A SageMaker AutoPilot model candidate consists of two fundamental components: a preprocessor and an algorithm. The preprocessor defines
a data transformation strategy, and the algorithm determines which specific ML approach to use for that model candidate. Both the preprocessor
and the algorithm have configurable hyperparameters that change the way the component works. These hyperparameters change later in the experiment
process as part of an automated hyperparameter tuning job.

In our example with the Santander customer transaction data, AutoPilot identified several model candidates for evaluation. Let’s take a detailed
look at one of the following candidates. In this case, the data preprocessor (dpp), **dpp0**, and the algorithm, **xgboost**, combine to
make candidate definition, **dpp0-xgboost**.

**dpp0-xgboost**: This data transformation strategy first transforms numeric features by using *RobustImputer*. It converts missing values
to `nan` and text features by using *MultiColumnTfidfVectorizer*. It merges all the generated features and applies *RobustStandardScaler*.
The transformed data is used to tune a *xgboost* model.

All told, AutoPilot suggested ten different preprocessing candidates, paired with three linear algorithms and seven *xgboost* algorithms.
We included the remaining nine model candidates as an appendix at the end of this post, so you can get a general idea of how they might differ
from one candidate to the next. Here’s what an individual model definition looks like in the candidate selection notebook:

{{<img src="picture18.png" title="" alt="">}}

#### Feature engineering and model tuning

Next, SageMaker Experiments essentially does an automated run, which is described on the candidate selection notebook. It does the following:

+ Executes the candidate pipelines.
+ Runs data transformation steps and any feature engineering included in the preprocessor. See the preceding examples above and the appendix.
  These are built on SciKit Learn and maintained [here](https://github.com/aws/sagemaker-scikit-learn-extension).
+ Conducts multi-algorithm hyperparameter tuning across 250 different combinations of hyperparameters. The default value of 250 is configurable.
+ Identifies the best model candidate.

#### Training results: 91.4% accuracy

The entire Experiments and AutoPilot process completed in a little under three hours. During that time, however, the actual training duration
lasted just under 16 hours because of parallelization of the HPO job in what appeared to be about ten jobs wide. Sixteen hours' worth of training
in under three hours is not bad at all!

As for our accuracy objective metric, the best candidate achieved a score of 91.4% accuracy. This is a very promising first result, considering
all we really did was remove an ID column from our data, upload it to S3, provide some very basic configuration values for the experiment, grab
a cup of coffee, and come back three hours later.

{{<img src="picture19.png" title="" alt="">}}

So, what made this particular candidate so special compared to the other 249 candidates evaluated? Well, the model used the *dpp1* preprocessor,
which is a stack of *RobustImputer* and *RobustMissingIndicator* followed by *LogExtremeValuesTransformer* converting text features by using 
*MultiColumnTfidfVectorizer*. It merges all the generated features and applies RobustPCA, followed by *RobustStandardScaler*. You can learn more
about those processors [here](https://github.com/aws/sagemaker-scikit-learn-extension). It then trains a linear learner algorithm with the
following specific hyperparameters:

{{<img src="picture20.png" title="" alt="">}}

### What’s next?

91% training accuracy is a great starting point considering it only took a few minutes of manual effort to get to that point. There are a few
things we can do next to start improving on that baseline accuracy score:

+ We need to evaluate our best candidate against a previously unseen test set of unlabeled data to ensure our model didn’t overfit to our training
  data. SageMaker does automatically break the data up into a train and validate split during training, but it’s still possible for a model to overfit
  to a validation set during training. For this, we can use the unlabeled **test.csv** data that accompanied our training data and deploy our model by
  using **SageMaker Batch Transform**. Batch Transform can do batch inference of data in S3. This approach avoids having to deploy a SageMaker endpoint
  and call it 200,000 times, line by line, to evaluate the test data.
+ After we have inferred labels on the **test.csv** data, we can submit it to the Kaggle leaderboard to see how our model fares against 8,802 teams
  of humans, the best of which scored 92.5% against the data in **test.csv**.
+ We can also do some basic data resampling, oversampling, and synthesizing to reduce the imbalance in our training data.
+ Finally, we could run a second experiment by using the F1 score instead of Accuracy and see how the best candidate from that experiment fares
  against the unlabeled **test.csv** data.

### Conclusion

We hope you enjoyed this walkthrough of training an ML model using SageMaker Studio Experiments and AutoPilot. We were personally surprised
by a few things in writing this:

First, how easy it was to set up and use SageMaker Experiments. It really was a breeze to go from zero to trained model, and we didn’t run
into any snags or hand waving.

Second, the training accuracy of the best candidate, which we fully expected to be very bad for AutoML used against an imbalanced classification
problem with no preprocessing to address the imbalance.

Third, that the winning model had a *text features using MultiColumnTfidfVectorizer* element to it. This is essentially useless in this use
case because there are no text features. However, it does speak to the effectiveness of the other elements of the preprocessing stack and
the best hyperparameters of the candidate model. I’d like to look at an intermediate dataset to see how (if at all) the
*MultiColumnTfidfVectorizer* transforms the training data because there is no text data to calculate Term Frequency or Document Frequency.
It’s interesting that this preprocessing element was even in a candidate, let alone that it did so well.

Finally, we were surprised that the linear model outperformed *XGBoost* in training. We fully expected one of the *XGBoost* models to
come out on top by a large margin. Perhaps with more preprocessing and more experimentation, it would.

Are you exploring machine learning to extract intelligence from your data and empower business decision-making? Get in touch with our AI/ML
experts today and discover how Rackspace Onica can help you develop an AWS-powered solution.

### Appendix: AutoPilot model definitions for the Santander dataset

**dpp1-linear-learner**: This data transformation strategy first transforms numeric features by using combined *RobustImputer* and
*RobustMissingIndicator* followed by *LogExtremeValuesTransformer*. It transforms text features by using *MultiColumnTfidfVectorizer*. It merges all
the generated features and applies *RobustPCA* followed by *RobustStandardScaler*. The transformed data is used to tune a linear-learner model.

**dpp2-xgboost**: This data transformation strategy first transforms numeric features by using *RobustImputer* text features by using
*MultiColumnTfidfVectorizer*. It merges all the generated features and applies *RobustPCA* followed by *RobustStandardScaler*. The transformed
data is used to tune a *xgboost* model.

**dpp3-xgboost**: This data transformation strategy first transforms numeric features using *RobustImputer* (converts missing values to `nan`)
text features by using *MultiColumnTfidfVectorizer*. It merges all the generated features and applies *RobustStandardScaler*. The transformed
data is used to tune a *xgboost* model.

**dpp4-linear-learner**: This data transformation strategy first transforms numeric features by using combined *RobustImputer* and
*RobustMissingIndicator* followed by *QuantileExtremeValuesTransformer*. It transforms text features by using *MultiColumnTfidfVectorizer*. It merges
all the generated features and applies *RobustPCA* followed by *RobustStandardScaler**. The transformed data is used to tune a *linear-learner* model.

**dpp5-xgboost**: This data transformation strategy first transforms numeric features by using *RobustImputer* (converts missing values to nan),
categorical features by using *ThresholdOneHotEncoder*. It transforms text features by using *MultiColumnTfidfVectorizer*. It merges all the
generated features and applies *RobustStandardScaler*. The transformed data is used to tune a *xgboost* model.

**dpp6-xgboost**: This data transformation strategy first transforms numeric features by using RobustImputer. It transforms text features by using *MultiColumnTfidfVectorizer*. It merges all the generated features and applies *RobustPCA* followed by *RobustStandardScaler*. The transformed
data is used to tune a xgboost model.

**dpp7-xgboost**: This data transformation strategy first transforms numeric features by using *RobustImputer* (converts missing values to `nan`).
It transforms text features by using *MultiColumnTfidfVectorizer*. It merges all the generated features and applies *RobustStandardScaler*. The
transformed data is used to tune a *xgboost* model.

**dpp8-linear-learner**: This data transformation strategy first transforms numeric features by using combined *RobustImputer* and
*RobustMissingIndicator* followed by *QuantileExtremeValuesTransformer*. It transforms text features by using *MultiColumnTfidfVectorizer*. 
It merges all the generated features and applies *RobustPCA* followed by *RobustStandardScaler*. The transformed data is used to tune a
*linear-learner* model.

**dpp9-xgboost**: This data transformation strategy first transforms numeric features by using combined *RobustImputer* and
*RobustMissingIndicator* followed by *QuantileExtremeValuesTransformer*. It transforms text features by using *MultiColumnTfidfVectorizer*.
It merges all the generated features and applies *RobustPCA* followed by *RobustStandardScaler*. The transformed data is used to tune a
*xgboost* model.

