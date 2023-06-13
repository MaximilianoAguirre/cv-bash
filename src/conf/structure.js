export const structure = {
    'bin': {
        'bash': { binary: true },
    },
    'home': {
        'guest': {
            '.bashrc': { content: 'export PATH=$PATH:/home/guest' },
            'cv': {
                'jobs.md': {
                    content: `# Professional experience

## Nextira

**Staff Engineer** - 2022/2023 - 1 year

Technical lead and code reviewer across teams. Part of the team in charge of designing, validating and sizing projects, building a dev team to deliver and following the project to success. 

Technical mentor for other developers in the company. Internal documentation and IP creator. Continuous improvements over company-wide processes. 

**Engineer Manager** - 2021 - 1 year

Manager of teams of 3 to 5 developers dedicated to design, deploy and support cloud infrastructure in AWS and Azure, mainly of the M&E and Gaming industries, but also including migration cases for other industries. 
    
Responsible for customer success at a technical level, setting expectations for costs and deliverables; as well as responsible for the internal team of developers assigned to a specific project/contract. Main designer and reviewer of the code/infrastructure created as part of the deliverables.

**Senior DevOps Engineer** - 2020 - 1 year

Development of platform for M&E and Gaming studios to move their entire studio infrastructure to AWS (with an optional hybrid mode). Infrastructure was defined modularly using Terraform to cover different client use cases. Frontend was created in React and backend was created in Python using FastAPI, both hosted as serverless services in AWS. Automations were created using AWS services (lambda, systems manager, step functions, etc.) to create and support resources behind the scenes (VMs, shared storage using FSx, EFS). SSO was implemented as a combination of Active Directory for server access and Cognito (with federated identities to other IdPs) to grant authentication and authorization to the app. 

**DevOps Engineer** - 2019 - 1 year

Development of solutions for HPC companies to run compute workloads in ephemeral clusters in AWS. Dynamic clusters were created based in the AWS ParallelCluster tool, and jobs were adapted from onprem scripts to use ephemeral nodes automatically created and destroyed based on automations hooked to Slurm queues events. 

## PwC

**Junior developer** - 2017/2018 - 5 months

Programming and maintenance of databases in SQL. 

## Ternium

**Summer internship** - 2019 - 3 months

Optimization of cold rolling process. PLCs programming and maintenance.
`},
                'skills.md': {
                    content: `# Technical skills

asd
asd
asd
asd
`
                }
            },
            'README.md': {
                content: `# Welcome 

👋 Hi! My name is Maximiliano Aguirre and this is a fun rework of mi CV.

If you were able to print this, you are probably familiar with bash interpreter. This is by no means a bash app running somehow in the javascript environment of the browser, but a cheap emulator of it in javascript done just for fun as a different way of presenting my CV.

Reading my CV from here should be an enjoyable activity for anyone used to use a terminal, but you are free to download a PDF version of my CV either by running 'open pdf' or by using the PDF button on the top right of the screen.

`},
        }
    },
    'mnt': {},
    'root': {},
    'usr': {
        'bin': {
            'cat': { binary: true },
            'ls': { binary: true },
        }
    },
    'var': {
        'log': {}
    },
};
