import React from "react";
import {
  ArrowRightIcon,
  ServerStackIcon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function StatsSection2(props) {
  const stats = [
    {
      title: "Web Servers",
      count: "1,680+",
      icon: ServerStackIcon,
    },
    {
      title: "Web Apps",
      count: "17,800+",
      icon: ComputerDesktopIcon,
    },
    {
      title: "Companies",
      count: "8,700+",
      icon: BuildingOfficeIcon,
    },
    {
      title: "Accounts Today",
      count: "480+",
      icon: UsersIcon,
    },
  ];

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          strapline={props.strapline}
          className="text-center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Link href="/" key={index}>
              <a className="group relative p-4 lg:p-6 bg-white rounded-xl transition duration-150 shadow-md shadow-gray-100">
                <div className="absolute inset-0 bg-white rounded-xl shadow-md shadow-gray-200 transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0" />
                <div className="relative text-center">
                  <div className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-4">
                    {stat.title}
                  </div>
                  <div className="relative w-12 mb-8 text-blue-500 mx-auto">
                    <stat.icon className="inline-block w-12 h-12 relative" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-extrabold text-gray-900">
                    {stat.count}
                  </h4>
                  <div className="flex justify-center items-center space-x-1 mt-4 pt-4 text-sm font-medium text-gray-500 border-t border-gray-100 group-hover:text-blue-500">
                    <span>More Details</span>
                    <ArrowRightIcon className="inline-block w-5 h-5 transition opacity-25 group-hover:opacity-75 group-hover:translate-x-2" />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default StatsSection2;
