S3
**

Our s3 Bucket is kbsoftware

Our tree structure is kbsoftware/contacts/<client site name e.g. hatherleigh_info>/<client folders>

Add a new Client to s3
======================
* Create a new folder in s3::

    kbsoftware/contacts/hatherleigh_info

* Add a new User in s3 Security Credentials::

    https://console.aws.amazon.com/iam/home?region=eu-west-1#security_credential

* User Name format as per client site name - select User from RH menu
* Un check the "Generate an access key for each user" box and click Create
* Open the newly created User:
    
    * Add them to the contacts group
    * Under Manage Password give them a defined password and record it along with their User name
    * Click Create Access Key and download the credentials.csv file to the relevant folder in the Private/Source folder for later use

Cyberduck CLI
=============
We are using Cyberduck CLI to upload files to the s3 server.

* Install Cyberduck CLI from::

    https://dist.duck.sh/

* For WINDOWS use: duck-4.8.0.18009.exe

* Note its installation folder, probabaly::

    c:\Program Files (i386)\Cyberduck CLI\duck.exe

* Place the files to be uploaded to s3 in a known folder, note the path
* Construct a script using Cyberducks duck.exe location, the Access Keys, the Source and Target paths e.g.::

    "c:\Program Files (x86)\Cyberduck CLI\duck.exe" --username <Access Key ID from credentials.csv> --password <Secret Access Key from credentials.csv> --upload s3://kbsoftware/contacts/hatherleigh_info/<client folder>/ c:/Users/<user>/repo/wip/hatherleigh_info/ --existing overwrite

* NOTE:
    * If the path has spaces enclose it in "" marks
    * Use ``--verbose`` to see what is happening in the command window
    * If using cut & paste ensure white space is not unwittingly included - Cyberduck will create a new folder on s3 and not update the foldere you created
* Run the script from the command line to test the files are uploaded and then update in the correct folder
* Open Task Scheduler in Windows and create a new basic task,name it and set a Trigger
* Under Action select Start a Program and paste the script into the Program/script box - click next
* Task Scheduler will ask to place the ``--arguments`` into the Arguments box - select Yes
* The Task is ready to run - you can run it manually from the Scheduler from The the Task Scheduler Library
* To test that the Policy prevents this User writing to another Users folder run the following tests after creating a test user and keys in s3::

    test to test - should work:
    "c:\Program Files (x86)\Cyberduck CLI\duck.exe" --username <Access Key ID from test_credentials.csv> --password <Secret Access Key from test_credentials.csv> --upload s3://kbsoftware/contacts/test/ c:/Users/<user>/repo/wip/hatherleigh_info/ --existing overwrite

    test to hatherleigh_info - should fail:
    "c:\Program Files (x86)\Cyberduck CLI\duck.exe" --username <Access Key ID from test_credentials.csv> --password <Secret Access Key from test_credentials.csv> --upload s3://kbsoftware/contacts/hatherleigh_info/<client folder>/ c:/Users/<user>/repo/wip/hatherleigh_info/ --existing overwrite

    hatherleighcommunitycentre_couk to test - should fail:
    "c:\Program Files (x86)\Cyberduck CLI\duck.exe" --username <Access Key ID from credentials.csv> --password <Secret Access Key from credentials.csv> --upload s3://kbsoftware/contacts/test/ c:/Users/<user>/repo/wip/hatherleigh_info/ --existing overwrite

Apply a Bucket Policy
=====================
These policies appear to apply to all users.

* Click Add or Edit Bucket Policy from::

    https://console.aws.amazon.com/s3/home?region=eu-west-1

* To allow Public Read Only access to all folders::

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowPublicRead",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::kbsoftware/*"
            }
        ]
    }

Apply a User, Group or Role Policy
==================================
* Click Create Policy in::

    https://console.aws.amazon.com/iam/home?region=eu-west-1#policies

* Select "Create Your Own Policy" and enter a Policy Name and the code
* To allow access to User folders by only specific User::

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowGroupToSeeBucketListInTheConsole",
                "Action": [
                    "s3:ListAllMyBuckets",
                    "s3:GetBucketLocation"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::*"
                ]
            },
            {
                "Sid": "AllowRootAndHomeListingOfCompanyBucket",
                "Action": [
                    "s3:ListBucket"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::kbsoftware"
                ],
                "Condition": {
                    "StringEquals": {
                        "s3:prefix": [
                            "",
                            "contacts/"
                        ],
                        "s3:delimiter": [
                            "/"
                        ]
                    }
                }
            },
            {
                "Sid": "AllowListingOfUserFolder",
                "Action": [
                    "s3:ListBucket"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::kbsoftware"
                ],
                "Condition": {
                    "StringLike": {
                        "s3:prefix": [
                            "contacts/${aws:username}/*"
                        ]
                    }
                }
            },
            {
                "Sid": "AllowAllS3ActionsInUserFolder",
                "Action": [
                    "s3:*"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::kbsoftware/contacts/${aws:username}/*"
                ]
            }
        ]
    }