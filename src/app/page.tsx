import Navbar from "../components/navbar/navbar-user";

export default async function Home() 
{
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
          WELCOME TO DEARIOMA SHOPPPPPPPPPPPPPPP !!!!!
        </h1>
      </div>
    </>
  )
}