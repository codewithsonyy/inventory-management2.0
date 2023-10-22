<br />
<div align="center">
  <h1 align="center">Hacktoberfest-2023</h1>
  <h2 align="center">Stockify-Inventory Management 2.0</h2>
<div align="center">

  <p align="center">

A cloud-based inventory management tool to easily manage, track and search products at one place.<br/>

> **_NOTE:_** aaj kuch toofani karte hai

</p>
</div>
    <a href="https://stockify-3u6imvyth-codewithsonyy.vercel.app/"><strong>View Site here »</strong></a>
    <br />
    <br />

  </p>
</div>

## [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#project-status)

<table class="no-border">
<tr>
    <td><img src="https://badgen.net/github/stars/codewithsonyy/inventory-management2.0" alt="CMake build"/></td>
    <td><img src="https://badgen.net/github/forks/codewithsonyy/inventory-management2.0" alt="CMake build"/></td>
   
       
  </tr>
  <tr>
    <td><img src="https://img.shields.io/github/issues/codewithsonyy/inventory-management2.0" alt="Operating systems"/></td>
    <td><img src="https://img.shields.io/github/issues-pr/codewithsonyy/inventory-management2.0" alt="CPU Architect"/></td>

  </tr>
</table>
<br />

<div>
	<img height="20" src="https://img.shields.io/badge/react.js-6DA55F?style=for-the-badge&logo=react.js&logoColor=white" alt="React" title="React" />
  <img height="20" src="https://img.shields.io/badge/framermotion-%23563D7C.svg?style=for-the-badge&logo=&logoColor=white" alt="Framer Motion" title="Framer Motion" />
 <img height="30" src="https://img.shields.io/badge/tailwind-%23323330.svg?style=for-the-badge&logo=tailwind&logoColor=%23F7DF1E" alt="Tailwind CSS" title="Tailwind CSS" />

  <img height="40" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" title="NPM" />
 <img height="50" src="https://img.shields.io/badge/mongodb-%23F05033.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" title="MongoDB" /> 
  <img height="60" src="https://img.shields.io/badge/next.js-%23121011.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" title="Next.js" /> 
	</div>

<br />

## Getting Started

- Ensure you have [Node.js](https://nodejs.org/en) installed.
  You can verify this by typing the following command in your terminal.

```bash
node --version
```

If you get a response as shown below, you do have it installed, otherwise you can download it from [here](https://nodejs.org/en).

```bash
v18.18.2
```

- Fork the repository to create a copy of it on your GitHub account

- Clone the forked repository by running the code below in your terminal

```sh
git clone https://github.com/[your-username]/inventory-management2.0.git
```

> _NB_:
>
> - Replace `[your-username]` with your GitHub username.
> - Also, if you changed the name of the repository, remember to change it in the url.

- Install project dependencies by running the following command in your terminal from the root directory of the project.

```sh
npm install
```

- Setup a [MongoDB](https://www.mongodb.com/) database (you can use mongodb compass, mongodb shell or mongodb community server)

- Take note of the `connection string` of the database.

```bash
# example
mongodb://localhost:27017/inventory-management
# or
mongodb+srv://localhost/inventory-management
# where `inventory-management` is the name of your database
```

- Create a `.env.local` file in the root directory of the project with the following environment variables.

```bash
JWT_SECRET=topSecret
MONGODB_URL=mongodb://localhost:27017/inventory-management
```

> - `JWT_SECRET` is a string to be used for encrypting and decrypting JWT tokens.
>
> - `MONGODB_URL` is the `connection string` for the database created earlier.

- Spin up the development server by running command below

```sh
npm run dev
```

- The application should start on `http://localhost:3000`.

<br/>

**_You are all set to rock!_**

<br>

![herojs](https://github.com/codewithsonyy/inventory-management2.0/assets/114895266/1bf5f19f-451d-491a-9cd1-80dea511627d)

<br>

![new](https://github.com/codewithsonyy/inventory-management2.0/assets/114895266/0093b902-484d-4873-9c1b-a15c5dfaa345)

## Contribution Guide

Contributions are what make the open source community an amazing place to learn new things, come up with innovate ideas and solutions to problems, and develop skills and abilities. Any contributions you make are greatly appreciated.

Feel free to open an issue to discuss it, or directly create a pull request with necessary changes.

### Making Your First Contribution

1. Setup the project locally.

   Head over to the [Get Started](#getting-started) if you are yet to do this.

2. Create a branch with a **descriptive** name highlighting the changes you intend to add.

   - Supposing you want to add code of conduct file, `code-of-conduct` could be your branch name. You can create a `code-of-conduct` branch by running the command below:

   ```bash
   git checkout -b code-of-conduct
   ```

3. Add the `code-of-conduct.md` file (_or whatever changes you want to make_).
4. Add your changes to git.

```bash
git add .
```

4. Commit your changes

```bash
git commit -m "Add code-of-conduct.md file"
```

5. Push changes to your GitHub repository

If this is your first time pushing changes to your repository from your current branch (`code-of-conduct`), run the following command:

```bash
git push --set-upstream origin code-of-conduct
```

else run the following in your terminal

```bash
git push
```

6. Create a new [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) on GitHub.

<br>

### Making Another Contribution

1. Switch to the main branch

```bash
git switch main
```

2. Add a remote for the [original repository](https://github.com/codewithsonyy/inventory-management2.0) (if you haven't already).

```bash
git remote add upstream https://github.com/codewithsonyy/inventory-management2.0.git
```

3. Pull the latest data unto your local repository

```bash
git pull upstream main
```

4. Push the new changes, if any, to your forked repository

```bash
 git push origin main
```

5. Repeat steps `2` - `6` of the [previous section](#making-your-first-contribution)

<br>

### Contributors

<a href="https://github.com/codewithsonyy/inventory-management2.0/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=codewithsonyy/inventory-management2.0" />
</a>

## MENTOR

This project is inspired by YouTuber [codewithharry](https://github.com/CodeWithHarry)

## LICENSE
