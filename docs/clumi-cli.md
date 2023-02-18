# Clumi CLI

Clumi CLI is a command-line interface tool for managing cloud infrastructure across multiple cloud providers. It allows you to perform common tasks such as creating virtual machines, managing storage, and configuring networks.

## Installation
To install Clumi CLI, you need to have Node.js and npm installed on your system. Then, you can install Clumi CLI by running the following command:

```
npm install -g clumi-cli
```

Usage
Once you have installed Clumi CLI, you can use it by running the clumi command in your terminal followed by the provider and command you want to execute. Here's an example:

```
clumi aws s3 mb my-bucket
```

This command will create an S3 bucket named my-bucket in AWS.

## Providers
Clumi CLI supports multiple cloud providers, including AWS, Azure, Oracle Cloud, and Nimbella. To execute commands for a specific provider, you need to prefix the command with the provider name.

AWS
To execute commands in AWS, prefix your command with aws. For example:

```
clumi aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --count 1 --instance-type t2.micro
```

### Azure
To execute commands in Azure, prefix your command with az. For example:

```
clumi az vm create --resource-group myResourceGroup --name myVM --image UbuntuLTS --admin-username azureuser --generate-ssh-keys
```

### Oracle Cloud
To execute commands in Oracle Cloud, prefix your command with oci. For example:

```
clumi oci compute instance list --compartment-id ocid1.compartment.oc1..exampleuniqueID
```

### Nimbella
To execute commands in [Nimbella](https://docs.nimbella.com/), prefix your command with np. For example:

```
clumi nim service create my-service
```

### NoProvider
No specific provider, use generic emulator

```
clumi np create storage
```

Contributing
We welcome contributions to Clumi CLI. If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

To get started with development, clone the repository and install the dependencies:

```
git clone https://github.com/your-username/clumi-cli.git
cd clumi-cli
npm install
```

To run the tests, use the following command:

```
npm test
```

## License
Clumi CLI is licensed under the MIT License. See LICENSE for more information.
