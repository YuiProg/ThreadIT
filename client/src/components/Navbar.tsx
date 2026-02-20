import React, { lazy, Suspense } from "react";
import Authenticate from "../helpers/authenticate";
import { Plus, Spool, User } from "lucide-react";
import ImageHandler from "../handlers/ImageHandler";
import AuthStore from "../store/authStore";
import { AnimatePresence, motion } from "motion/react";

const CreateThread = lazy(() => import("./HomePageComponents/CreateThread"));
const CreatePost = lazy(() => import("./HomePageComponents/CreatePost"));

type UpdateInput = {
  username: string;
  image: string;
};

type UserType = {
  user: {
    username: string;
    profilePic?: string;
    picId?: string;
    _id: string;
  } | null;
};

type ModalState = {
  //FOR THE MODAL
  isOpen: boolean;
  user: UserType;
  onClose: () => void;
};

type NavbarState = {
  //FOR THE NAVBAR
  isOpen: boolean;
  createOpen: boolean;
  openThread: boolean;
};

//EDIT PROFILE MODAL
class Modal extends React.Component<ModalState, UpdateInput> {
  constructor(props: ModalState) {
    super(props);
    this.state = {
      image: "",
      username: this.user?.username || "",
    };
  }

  private user = this.props.user.user;

  private handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return null;

    const imageHandler = new ImageHandler({ image });
    const formattedImage = await imageHandler.format();
    this.setState({ image: formattedImage });
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.user) return;
    const u = new Authenticate({
      username: this.state.username,
      profilePic: this.state.image,
    });

    u.updateUser(this.user._id);
  };

  render(): React.ReactNode {
    const { authenticating } = AuthStore.getState();
    if (!this.user) return null;
    return (
      <>
        <div
          onClick={() => this.props.onClose()}
          className="inset-0 bg-black/40 z-50 fixed flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-150 h-150 bg-base-200 rounded-xl shadow-2xl flex flex-col items-center p-20"
          >
            {this.user.profilePic || this.state.image ? (
              <div className="w-40 h-40 rounded-full border flex items-center justify-center mb-10">
                <img
                  loading="lazy"
                  src={
                    this.state.image ? this.state.image : this.user.profilePic
                  }
                  alt="profilePre"
                  className="relative w-40 h-40 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full border flex items-center justify-center mb-10">
                <User size={80} />
              </div>
            )}
            <form onSubmit={(e) => this.onSubmit(e)} className="w-full">
              <input
                onChange={(e) => this.handleImage(e)}
                type="file"
                accept="image/png, image/jpeg"
                className="file-input mb-5 w-full"
              />
              <p className="mb-2">Username</p>
              <input
                onChange={(e) => this.handleChange(e)}
                name="username"
                type="text"
                className="input w-full mb-5"
                placeholder={this.user.username}
                value={this.state.username}
              />
              <button
                disabled={authenticating}
                type="submit"
                className="btn btn-dash w-full"
              >
                {authenticating ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "UPDATE"
                )}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

class Navbar extends React.Component<UserType, NavbarState> {
  constructor(user: UserType) {
    super(user);
    this.state = {
      isOpen: false,
      createOpen: false,
      openThread: false,
    };
  }

  private handleLogout = (): void => {
    const l = new Authenticate({
      email: "",
      password: "",
    });
    l.Logout();
  };

  render(): React.ReactNode {
    return (
      <>
        <AnimatePresence>
          {this.state.createOpen && ( //this is going white screen pag nag loload fix this later.
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <h1>LOADING...</h1>
                </div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreatePost
                  onClose={() => this.setState({ createOpen: false })}
                />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {this.state.openThread && (
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <h1>LOADING...</h1>
                </div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CreateThread
                  onClose={() => this.setState({ openThread: false })}
                  userImage={String(this.props.user?.profilePic)}
                />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
        {this.state.isOpen && (
          <Modal
            user={{ user: this.props.user }}
            isOpen={this.state.isOpen}
            onClose={() => this.setState({ isOpen: false })}
          />
        )}

        <div className="fixed w-full z-10">
          <nav className="w-full h-16 bg-gray-800 flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold ml-5">
                <a href="/">THREAD.IT</a>
              </h1>
            </div>
            <div className="w-[50%] flex items-center justify-end">
              {this.props.user ? (
                <>
                  <button
                    onClick={() => {
                      this.setState({ createOpen: true });
                      this.setState({ isOpen: false });
                    }}
                    className="border-white text-white btn btn-outline mr-2 rounded-full hover:border-0 hover:bg-black/20 active:bg-black/50"
                  >
                    <Plus />
                    Post
                  </button>
                  <button
                    onClick={() => {
                      this.setState({ openThread: true });
                    }}
                    className="border-white text-white btn btn-outline mr-2 rounded-full hover:border-0 hover:bg-black/20"
                  >
                    <Spool />
                    Create Thread
                  </button>
                  <div className="dropdown dropdown-end flex">
                    {this.props.user.profilePic ? (
                      <>
                        <div
                          tabIndex={0}
                          role="button"
                          className="w-10 h-10 border mr-5 text-xl cursor-pointer rounded-full flex items-center justify-center"
                        >
                          <div className="w-10 h-full rounded-full absolute hover:bg-black/20 transition-colors z-99" />
                          <img
                            loading="lazy"
                            src={this.props.user.profilePic}
                            alt="profilePic"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                      </>
                    ) : (
                      <div
                        tabIndex={0}
                        role="button"
                        className="w-10 h-10 border mr-2 text-xl cursor-pointer rounded-full flex items-center justify-center"
                      >
                        <User />
                      </div>
                    )}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 mt-15 mr-2 shadow-sm"
                    >
                      <li>
                        <a>PROFILE</a>
                      </li>
                      <li onClick={() => this.setState({ isOpen: true })}>
                        <a>EDIT PROFILE</a>
                      </li>
                      <li onClick={this.handleLogout}>
                        <a>LOGOUT</a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <ul className="flex gap-5 mr-5">
                  <li>
                    <a
                      href="/"
                      className="text-white text-lg hover:text-gray-400"
                    >
                      Login
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </>
    );
  }
}

export default Navbar;
