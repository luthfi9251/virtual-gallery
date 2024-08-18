import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const CMS_COMPANY_PROFILE = "CMS_COMPANY_PROFILE";
const loaderLandingPage = (url) => `${process.env.IMAGE_SERVICE_URL}/img${url}`;
export async function GET(req, props) {
    try {
        let dataCMS = await prisma.CMSPageVariable.findMany({
            where: {
                page_group: CMS_COMPANY_PROFILE,
            },
        });

        let PREFIX = {
            HERO_CARROUSEL: "HERO_CARROUSEL",
            ABOUT_US_LANDING_PAGE: "ABOUT_US_LANDING_PAGE",
            ABOUT_OWNER_LANDING_PAGE: "ABOUT_OWNER_LANDING_PAGE",
            ABOUT_OWNER_IMAGE_TAG_NAME: "ABOUT_OWNER_LANDING_PAGE_IMAGE",
            GALLERY_LANDING_PAGE: "GALLERY_LANDING_PAGE",
            ACTIVITY_LANDING_PAGE: "ACTIVITY_LANDING_PAGE",
            CONTACT_LANDING_PAGE: "CONTACT_LANDING_PAGE",
        };

        let responseFormat = {
            hero_image_list: [],
            about_us: "",
            about_owner: {
                nama: "",
                deskripsi: "",
                imageUrl: "",
            },
            gallery: {
                first: "",
                second: "",
                third: "",
            },
            activity_list: [],
            contact: [],
        };

        dataCMS.forEach((item) => {
            let tag = item.tag;
            if (tag.startsWith(PREFIX.HERO_CARROUSEL)) {
                responseFormat.hero_image_list.push(
                    loaderLandingPage(item.value)
                );
            } else if (tag.startsWith(PREFIX.ABOUT_US_LANDING_PAGE)) {
                responseFormat.about_us = item.value;
            } else if (tag.startsWith(PREFIX.GALLERY_LANDING_PAGE)) {
                let categorize = item.tag.replace(
                    PREFIX.GALLERY_LANDING_PAGE + "_",
                    ""
                );
                switch (categorize) {
                    case "IMAGEONE":
                        responseFormat.gallery.first = loaderLandingPage(
                            item.value
                        );
                        break;
                    case "IMAGETWO":
                        responseFormat.gallery.second = loaderLandingPage(
                            item.value
                        );
                        break;
                    case "IMAGETHREE":
                        responseFormat.gallery.third = loaderLandingPage(
                            item.value
                        );
                        break;
                    default:
                        break;
                }
            } else if (tag.startsWith(PREFIX.ACTIVITY_LANDING_PAGE)) {
                let parsed = JSON.parse(item.value);
                responseFormat.activity_list.push({
                    imageUrl: loaderLandingPage(parsed.imageUrl),
                    name: parsed.name,
                });
            } else if (tag.startsWith(PREFIX.CONTACT_LANDING_PAGE)) {
                let parsed = JSON.parse(item.value);
                let formattedResponse = [];
                Object.keys(parsed).forEach((item) => {
                    if (item !== "alamat") {
                        formattedResponse.push({
                            type: item.toUpperCase(),
                            value: parsed[item],
                            link: "",
                        });
                    }
                });
                responseFormat.contact = formattedResponse;
                responseFormat.alamat = parsed.alamat;
            } else if (tag === PREFIX.ABOUT_OWNER_LANDING_PAGE) {
                let parsed = JSON.parse(item.value);
                responseFormat.about_owner.nama = parsed.nama;
                responseFormat.about_owner.deskripsi = parsed.deskripsi;
            } else if (tag === PREFIX.ABOUT_OWNER_IMAGE_TAG_NAME) {
                responseFormat.about_owner.imageUrl = loaderLandingPage(
                    item.value
                );
            }
        });
        return NextResponse.json(responseFormat);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error });
    }
}
