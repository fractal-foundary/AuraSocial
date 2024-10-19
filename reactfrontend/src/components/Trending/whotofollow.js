
// TODO: need to improve the style of WhotoFollow component.Abhi ke liye sahi h.

function Persontofollow({ Name, Username, ImageLink }) {
    return (
        <div className="flex justify-between hover:bg-slate-100 rounded items-center">
            <div className="item my-2 p-2 flex ">
                <img src={ImageLink} alt="" className="w-12 h-12 rounded-full" />
                <div className="mx-3">
                    <div className="font-bold ">{Name}</div>
                    <div className=" text-sm text-gray-300">{Username}</div>
                </div>
            </div>

            <button className="bg-white text-black h-8 rounded-full xl:flex items-center px-3 font-semibold mx-2 hidden">Follow</button>
        </div>
    );
}


function WhotoFollow() {
    return (
        <div className=" m-3 w-[80%] 2xl:w-[75%]  rounded-xl p-5 space-y-2">
            <h1 className="text-md lg:text-xl text-center lg:text-start font-bold px-2">Whom To Follow</h1>

            <Persontofollow Name="Gyan Dev" Username="@gyandev" ImageLink="https://pbs.twimg.com/profile_images/1791002277685428224/MK3cZ88K_bigger.jpg" />
            <Persontofollow Name="Navneet Bharadwaj" Username="@navneet" ImageLink="https://pbs.twimg.com/profile_images/1257381512498077696/ACJBYZ-n_normal.jpg" />
            <Persontofollow Name="Elon Musk" Username="@elonmusk" ImageLink="https://pbs.twimg.com/profile_images/1764817394755567616/8YWm4TaM_normal.jpg" />

        </div>
    );
}

export default WhotoFollow;