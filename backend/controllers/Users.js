import { where } from "sequelize";
import Users from "../models/UserModel.js";
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'fisr', 'email', 'role'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUsers = async (req, res) => {
    const { firstName, lastName, email, password, confPassword, role, country } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role,
            country: country
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error(error);  // Log the full error to the console
        res.status(400).json({ msg: error.message || "An error occurred while creating the user" });
    }
};

export const updateUsers = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        const { name, email, password, confPassword, role } = req.body;
        let hashPassword;
        if (password) {
            if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
            hashPassword = await argon2.hash(password);
        }
        await Users.update({
            name: name,
            email: email,
            password: hashPassword ? hashPassword : user.password,
            role: role
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}