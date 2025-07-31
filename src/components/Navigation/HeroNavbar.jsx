"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroNavbarList } from "@/constants/navigationExports";
import Image from "next/image";
import Link from "next/link";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { geminiProSvg } from "@/constants/imageExports";

function HeroNavbar({ collapsed, setCollapsed }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 60 : 240 }}
        transition={{ duration: 0.4, type: "linear" }}
        className="h-full bg-gray-500  overflow-hidden px-2 py-5 hidden sm:block"
      >
        {/* Brand & Toggle */}
        <div className="flex items-center justify-between mb-6">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src={collapsed ? "" : geminiProSvg}
                  alt="logo"
                  width={collapsed ? 50 : 50}
                  priority={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <RiMenu2Fill
            className="w-6 h-6 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <ul className="space-y-4">
          {heroNavbarList.map((item) => (
            <li
              key={item.id}
              className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
            >
              <Link href={item.path}>
                <div className="flex items-center space-x-2">
                  <item.icon className="w-6 h-6" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-base font-semibold"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Mobile Toggle Button */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-amber-200">
        <Image src={geminiProSvg} alt="logo" width={40} />
        <RiMenu2Fill
          className="w-6 h-6 cursor-pointer"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-amber-200 sm:hidden p-5"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <RiCloseLine
                className="w-7 h-7 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            <ul className="space-y-4">
              {heroNavbarList.map((item) => (
                <li
                  key={item.id}
                  className="hover:bg-gray-300 p-3 rounded-md cursor-pointer"
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-lg font-semibold">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeroNavbar;
